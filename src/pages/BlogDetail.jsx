import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { URLS } from '../Url';
import './BlogDetail.css';

/* ─── Reading Progress Bar ─────────────────────────────── */
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="reading-progress-track">
      <div className="reading-progress-fill" style={{ width: `${progress}%` }} />
    </div>
  );
};

/* ─── Skeleton Loading Screen ──────────────────────────── */
const SkeletonScreen = () => (
  <div className="skeleton-page">
    <div className="skeleton-hero">
      <div className="skeleton-hero-inner">
        <div className="sk sk-badge" />
        <div className="sk sk-title" />
        <div className="sk sk-title sk-title-short" />
        <div className="sk sk-meta" />
      </div>
    </div>
    <div className="skeleton-body">
      <div className="skeleton-article">
        {[100, 95, 88, 100, 72, 90, 60, 100, 83].map((w, i) => (
          <div key={i} className="sk sk-line" style={{ width: `${w}%`, animationDelay: `${i * 0.06}s` }} />
        ))}
        <div className="sk sk-heading" style={{ marginTop: 40 }} />
        {[100, 90, 77, 100, 65].map((w, i) => (
          <div key={i} className="sk sk-line" style={{ width: `${w}%`, animationDelay: `${i * 0.06}s` }} />
        ))}
      </div>
      <div className="skeleton-sidebar">
        <div className="sk sk-sidebar-card" />
        <div className="sk sk-sidebar-card sk-sidebar-card-tall" />
      </div>
    </div>
  </div>
);

/* ─── Table of Contents ────────────────────────────────── */
const TableOfContents = ({ contentRef }) => {
  const [headings, setHeadings] = useState([]);
  const [active, setActive] = useState('');

  useEffect(() => {
    if (!contentRef.current) return;
    const h2s = Array.from(contentRef.current.querySelectorAll('h2'));
    const items = h2s.map((el, i) => {
      const id = `toc-heading-${i}`;
      el.id = id;
      return { id, text: el.textContent.replace(/^[^\w]+/, '').trim() };
    });
    setHeadings(items);
  }, [contentRef]);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <div className="sidebar-widget toc-widget">
      <h3 className="sidebar-widget-title">Contents</h3>
      <nav className="toc-nav">
        {headings.map(({ id, text }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`toc-link ${active === id ? 'toc-active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            {text}
          </a>
        ))}
      </nav>
    </div>
  );
};

/* ─── Main Component ───────────────────────────────────── */
const BlogDetail = () => {
  const { blogSlug } = useParams();
  const location = useLocation();
  const blogIdFromState = location.state?.blogId;
  
  // Note: For SEO, ideally the backend should support getBySlug.
  // Currently, we use the ID passed via state. 
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const articleRef = useRef(null);

  const getImageUrl = (path) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `${URLS.base_url}/${path}`;
  };

  useEffect(() => {
    const fetchBlogDetail = async () => {
      if (!blogIdFromState) {
        setError('Blog ID missing. Please navigate from the home page.');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(URLS.getBlogById, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: blogIdFromState }),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const json = await response.json();
        if (json.success && json.data) {
          setBlog(json.data);
        } else {
          setError(json.message || 'Failed to load blog details.');
        }
      } catch (err) {
        setError('An error occurred while fetching the blog.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetail();
    window.scrollTo(0, 0);
  }, []);

  const readingTime = useMemo(() => {
    if (!blog?.description) return 1;
    const text = blog.description.replace(/<[^>]+>/g, '');
    return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
  }, [blog]);

  if (loading) return <SkeletonScreen />;

  if (error || !blog) {
    return (
      <div className="blog-detail-error">
        <div className="error-icon">✦</div>
        <h2>Something went wrong</h2>
        <p>{error || 'Blog post not found.'}</p>
        <Link to="/blog" className="back-btn">← Back to Blog</Link>
      </div>
    );
  }

  const authorName = blog.creatorName || blog.author || 'VOLTEDZ Team';
  const tags = blog.tags || blog.keywords || [];
  const bannerImage = blog.blogBanner
    ? getImageUrl(blog.blogBanner)
    : blog.blogThumbnail
      ? getImageUrl(blog.blogThumbnail)
      : null;

  const shareUrl = window.location.href;

  return (
    <div className="blog-detail-page">
      <ReadingProgress />

      {/* ── Hero ── */}
      <section className="blog-hero" style={bannerImage ? { '--hero-bg': `url(${bannerImage})` } : {}}>
        <div className={`blog-hero-inner ${!bannerImage ? 'blog-hero-no-image' : ''}`}>
          <nav className="blog-breadcrumb">
            <Link to="/" className="back-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              All Articles
            </Link>
          </nav>

          <div className="blog-hero-content">
            <span className="blog-category-badge">{blog.category}</span>
            <h1 className="blog-main-title">{blog.title}</h1>

            <div className="blog-byline-card">
              <div className="byline-avatar">
                {authorName.charAt(0).toUpperCase()}
              </div>
              <div className="byline-info">
                <span className="byline-author">{authorName}</span>
                <div className="byline-meta">
                  <span>
                    {new Date(blog.logCreatedDate).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </span>
                  <span className="byline-dot">·</span>
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body Layout ── */}
      <div className="blog-layout">
        {/* ── Article ── */}
        <main className="blog-main-col">
          <article className="blog-article" ref={articleRef}>
            <div
              className="blog-body-text drop-cap"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />

            {tags.length > 0 && (
              <div className="blog-tags-footer">
                <span className="tags-label">Tagged:</span>
                <div className="blog-tags-list">
                  {tags.map((tag, idx) => (
                    <span key={idx} className="blog-tag-item">#{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* ── Share Bar (desktop inline) ── */}
          <div className="blog-share-bar">
            <span className="share-label">Share</span>
            <div className="share-icons">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="share-btn fb" aria-label="Share on Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`}
                target="_blank" rel="noopener noreferrer"
                className="share-btn tw" aria-label="Share on X"
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" /></svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="share-btn ln" aria-label="Share on LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + ' ' + shareUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="share-btn wa" aria-label="Share on WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
              </a>
            </div>
          </div>
        </main>

        {/* ── Sidebar ── */}
        <aside className="blog-sidebar">
          <TableOfContents contentRef={articleRef} />

          <div className="sidebar-widget about-widget">
            <h3 className="sidebar-widget-title">About Academy</h3>
            <p className="sidebar-text">Our training programs are designed to bridge the gap between academia and industry requirements.</p>
          </div>

          {/* <div className="sidebar-widget newsletter-widget">
            <h3 className="sidebar-widget-title">Newsletter</h3>
            <p className="sidebar-text">Stay updated with the latest in technology and industrial automation.</p>
            <form className="sidebar-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-float-wrap">
                <input type="email" id="sidebar-email" placeholder=" " required />
                <label htmlFor="sidebar-email">Your email address</label>
              </div>
              <button type="submit" className="subscribe-btn">
                Subscribe
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </form>
          </div> */}

          <div className="sidebar-widget recent-widget">
            <h3 className="sidebar-widget-title">Latest Posts</h3>
            <div className="recent-posts">
              <div className="mini-post">
                <div className="mini-thumb shimmer" />
                <div className="mini-info">
                  <Link to="#">Industry 4.0: What you need to know</Link>
                  <span>October 20, 2025</span>
                </div>
              </div>
              <div className="mini-post">
                <div className="mini-thumb shimmer" />
                <div className="mini-info">
                  <Link to="#">Modern PLC Programming standards</Link>
                  <span>October 15, 2025</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Mobile Fixed Share Bar ── */}
      <div className="mobile-share-bar">
        <span className="mobile-share-label">Share</span>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="share-btn fb" aria-label="Facebook">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
        </a>
        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer" className="share-btn tw" aria-label="X">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" /></svg>
        </a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="share-btn ln" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
        </a>
        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + ' ' + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="share-btn wa" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
        </a>
      </div>
    </div>
  );
};

export default BlogDetail;