import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';

const coursesData = [
  {
    id: 1,
    route: '/courses/industrial-automation',
    title: 'Industrial Automation',
    description: 'Master PLC, SCADA, HMI, and VFDs to build a career in industrial automation.',
    img: '/courses/Industrial Automation.png',
    rating: 5.0, reviews: 1, duration: '12 Weeks', Modules: 24, quizzes: 4,
    price: 'paid', priceDisplay: '₹25,000', type: 'online', categories: [12],
  },
  {
    id: 2,
    route: '/courses/building-management-systems',
    title: 'Building Management Systems (BMS)',
    description: 'Learn CCTV, Biometric systems, Fire Alarms, Networking, and HVAC controls.',
    img: '/courses/Building Management Systems.png',
    rating: 5.0, reviews: 1, duration: '10 Weeks', Modules: 20, quizzes: 3,
    price: 'paid', priceDisplay: '₹20,000', type: 'online', categories: [13],
  },
  {
    id: 3,
    route: '/courses/embedded-systems',
    title: 'Embedded Systems & IoT',
    description: 'Deep dive into Microcontrollers, IoT Cloud Integration, and FreeRTOS programming.',
    img: '/courses/Embedded Systems & IoT.png',
    rating: 5.0, reviews: 1, duration: '14 Weeks', Modules: 28, quizzes: 5,
    price: 'paid', priceDisplay: '₹30,000', originalPrice: '₹35,000', priceSuffix: '', type: 'online', categories: [16],
  },
  {
    id: 4,
    route: '/courses/data-science',
    title: 'Data Science & AI',
    description: 'Master Python, MySQL, Machine Learning, AI, and Deep Learning for the data-driven world.',
    img: '/courses/Data Science & AI.png',
    rating: 5.0, reviews: 1, duration: '16 Weeks', lessons: '15+', quizzes: 6,
    price: 'paid', priceDisplay: '₹40,000', type: 'online', categories: [34],
  },
  {
    id: 5,
    route: '/courses/cctv',
    title: 'CCTV & Security Systems',
    description: 'Master Python, MySQL, Machine Learning, AI, and Deep Learning for the data-driven world.',
    img: '/courses/Data Science & AI.png',
    rating: 5.0, reviews: 1, duration: '16 Weeks', lessons: '15+', quizzes: 6,
    price: 'paid', priceDisplay: '₹40,000', type: 'online', categories: [34],
  },
];

const categories = [
  { id: 12, label: 'Automation', count: 1 },
  { id: 13, label: 'BMS & CCTV', count: 1 },
  { id: 16, label: 'Embedded Systems', count: 1 },
  { id: 34, label: 'Data Science & AI', count: 1 },
];

const COURSES_PER_PAGE = 9;

function StarRating({ rating }) {
  return (
    <div className="review-stars-rated">
      {[1, 2, 3, 4, 5].map((s) => (
        <div className="review-star" key={s}>
          <em className="far lp-review-svg-star">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </em>
          <em className="fas lp-review-svg-star" style={{ width: s <= Math.floor(rating) ? '100%' : s - 1 < rating ? `${(rating % 1) * 100}%` : '0%' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </em>
        </div>
      ))}
    </div>
  );
}

function CourseCard({ course }) {
  const isPaid = course.price === 'paid';
  return (
    <li className="course">
      <div className="course-item">
        <div className="course-thumbnail">
          <Link  to={`${course.route}`}>
            <div className="course-img">
              <img src={course.img} alt="course thumbnail" loading="lazy" />
            </div>
          </Link>
          <button className="lp-button-wishlist-action" type="button" aria-label="Add to Wishlist">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
        <div className="course-content">
          <div className="course-rating">
            <StarRating rating={course.rating} />
            <span className="course-rate__summary">{course.rating.toFixed(1)}</span>
            <span className="course-rate__summary-text">( {course.reviews} <span>Review</span> )</span>
          </div>
          <Link  className="course-permalink" to={`${course.route}`}>
            <h3 className="course-title">{course.title}</h3>
          </Link>
          <p className="course-short-description">{course.description}</p>
          <div className="course-info">
            {course.duration && <span className="course-duration">{course.duration}</span>}
            {course.address && <div className="course-address">{course.address}</div>}
            {course.lessons !== undefined && (
              <div className="course-count-item lp_lesson">{course.lessons} Lesson{course.lessons !== 1 ? 's' : ''}</div>
            )}
            {course.quizzes !== undefined && course.quizzes > 0 && (
              <div className="course-count-item lp_quiz">{course.quizzes} Quiz{course.quizzes !== 1 ? 'zes' : ''}</div>
            )}
          </div>
          <div className="course-bottom-content">
            <span className="course-price">
              {isPaid ? (
                <span className="course-item-price">
                  {course.originalPrice && <span className="origin-price">{course.originalPrice}</span>}
                  <span className="price">{course.priceDisplay}</span>
                  {course.priceSuffix && <span className="course-price-suffix"> {course.priceSuffix}</span>}
                </span>
              ) : (
                <span className="course-item-price"><span className="free">Free</span></span>
              )}
            </span>
            <Link  className={`btn-view-course${isPaid ? ' btn-paid' : ''}`} to={`${course.route}`}>
              {isPaid ? 'Enroll now' : 'Enroll now'}
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Courses() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderBy, setOrderBy] = useState('post_date');
  const [layout, setLayout] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  // Pending filter state (applied on "Apply")
  const [pendingCategories, setPendingCategories] = useState([]);
  const [pendingTypes, setPendingTypes] = useState([]);
  const [pendingPrice, setPendingPrice] = useState([]);
  const [pendingRating, setPendingRating] = useState(0);

  const togglePendingCategory = (id) => {
    setPendingCategories(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };
  const togglePendingType = (t) => {
    setPendingTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };
  const togglePendingPrice = (p) => {
    setPendingPrice(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const applyFilters = () => {
    setSelectedCategories(pendingCategories);
    setSelectedTypes(pendingTypes);
    setSelectedPrice(pendingPrice);
    setSelectedRating(pendingRating);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setPendingCategories([]);
    setPendingTypes([]);
    setPendingPrice([]);
    setPendingRating(0);
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedPrice([]);
    setSelectedRating(0);
    setSearchQuery('');
    setCurrentPage(1);
  };

  let filtered = coursesData.filter(c => {
    if (selectedCategories.length && !selectedCategories.some(id => c.categories.includes(id))) return false;
    if (selectedTypes.length && !selectedTypes.includes(c.type)) return false;
    if (selectedPrice.length) {
      if (selectedPrice.includes('on_free') && !selectedPrice.includes('on_paid') && c.price !== 'free') return false;
      if (selectedPrice.includes('on_paid') && !selectedPrice.includes('on_free') && c.price !== 'paid') return false;
    }
    if (selectedRating > 0 && c.rating < selectedRating) return false;
    if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Sort
  if (orderBy === 'post_title') filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  else if (orderBy === 'post_title_desc') filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
  else if (orderBy === 'price') filtered = [...filtered].sort((a, b) => (parseFloat(b.priceDisplay) || 0) - (parseFloat(a.priceDisplay) || 0));
  else if (orderBy === 'price_low') filtered = [...filtered].sort((a, b) => (parseFloat(a.priceDisplay) || 0) - (parseFloat(b.priceDisplay) || 0));

  const totalResults = filtered.length;
  const totalPages = Math.ceil(totalResults / COURSES_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * COURSES_PER_PAGE, currentPage * COURSES_PER_PAGE);
  const startResult = totalResults === 0 ? 0 : (currentPage - 1) * COURSES_PER_PAGE + 1;
  const endResult = Math.min(currentPage * COURSES_PER_PAGE, totalResults);

  return (
    <div className="lp-archive-courses">
      {/* Banner */}
      <div className="top_heading">
        <div className="banner-wrapper container">
          <div className="banner-column">
            <div className="banner-content">
              <ul className="breadcrumbs">
                <li><Link  to="/">Home</Link></li>
                <li>Courses</li>
              </ul>
              <h1 className="page-title">Courses</h1>
              <p className="page-excerpt">Discover a wide range of courses designed to help you gain new skills</p>
            </div>
            <div className="banner-image">
              <img src="https://akademic.arrowtheme.com/wp-content/themes/akademic/images/page_title.png" alt="breadcrumbs" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lp-content-area has-sidebar sidebar-left">
        {/* Sidebar */}
        <div className="lp-archive-courses-sidebar">
          <div className="widget learnpress widget_course_filter">
            <h3 className="widget-title">Course Filter</h3>
            <form className="lp-form-course-filter" onSubmit={e => { e.preventDefault(); applyFilters(); }}>
              {/* Categories */}
              <div className="lp-form-course-filter__item">
                <div className="lp-form-course-filter__title">Categories</div>
                <div className="lp-form-course-filter__content">
                  {categories.map(cat => (
                    <div className="lp-course-filter__field" key={cat.id}>
                      <input
                        type="checkbox"
                        id={`cat-${cat.id}`}
                        checked={pendingCategories.includes(cat.id)}
                        onChange={() => togglePendingCategory(cat.id)}
                      />
                      <label htmlFor={`cat-${cat.id}`}>{cat.label}</label>
                      <span className="count">{cat.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div className="lp-form-course-filter__item">
                <div className="lp-form-course-filter__title">Type</div>
                <div className="lp-form-course-filter__content">
                  {['online', 'offline'].map(t => (
                    <div className="lp-course-filter__field" key={t}>
                      <input type="checkbox" id={`type-${t}`} checked={pendingTypes.includes(t)} onChange={() => togglePendingType(t)} />
                      <label htmlFor={`type-${t}`}>{t.charAt(0).toUpperCase() + t.slice(1)}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="lp-form-course-filter__item">
                <div className="lp-form-course-filter__title">Price</div>
                <div className="lp-form-course-filter__content">
                  <div className="lp-course-filter__field">
                    <input type="checkbox" id="price-free" checked={pendingPrice.includes('on_free')} onChange={() => togglePendingPrice('on_free')} />
                    <label htmlFor="price-free">Free</label>
                    <span className="count">8</span>
                  </div>
                  <div className="lp-course-filter__field">
                    <input type="checkbox" id="price-paid" checked={pendingPrice.includes('on_paid')} onChange={() => togglePendingPrice('on_paid')} />
                    <label htmlFor="price-paid">Paid</label>
                    <span className="count">2</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="lp-form-course-filter__item">
                <div className="lp-form-course-filter__title">Rating</div>
                <div className="lp-form-course-filter__content">
                  <div className="lp-field-star">
                    <div className="lp-course-filter__field">
                      <input type="radio" id="review-star-0" name="c_review_star" value={0} checked={pendingRating === 0} onChange={() => setPendingRating(0)} />
                      <label htmlFor="review-star-0">All rating</label>
                    </div>
                    {[1, 2, 3, 4].map(s => (
                      <div className="lp-course-filter__field" key={s}>
                        <input type="radio" id={`review-star-${s}`} name="c_review_star" value={s} checked={pendingRating === s} onChange={() => setPendingRating(s)} />
                        <div className="lp-filter-item-star">
                          <StarRating rating={s} />
                          <span>& up</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button type="submit" className="course-filter-submit">Apply</button>
              <button type="button" className="course-filter-reset" onClick={resetFilters}>Reset</button>
            </form>
          </div>
        </div>

        {/* Main Content */}
        <div className="lp-main-content">
          <div className="lp-list-courses-default">
            {/* Bar */}
            <div className="lp-courses-bar">
              <div className="left-bar">
                <span className="courses-page-result">
                  {totalResults === 0 ? 'No results' : `Showing ${startResult}-${endResult} of ${totalResults} results`}
                </span>
              </div>
              <div className="right-bar">
                <div className="lp-course-filter-search">
                  <input
                    type="text"
                    placeholder="Search Course"
                    value={searchQuery}
                    onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    className="lp-course-filter-search-input"
                  />
                </div>
                <select className="courses-order-by" value={orderBy} onChange={e => setOrderBy(e.target.value)}>
                  <option value="post_date">Newly published</option>
                  <option value="post_title">Title a-z</option>
                  <option value="post_title_desc">Title z-a</option>
                  <option value="price">Price high to low</option>
                  <option value="price_low">Price low to high</option>
                </select>
                <div className="switch-layout">
                  <button className={`switch-btn grid${layout === 'grid' ? ' active' : ''}`} onClick={() => setLayout('grid')} title="Grid" type="button">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor" /><rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor" /><rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor" /><rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" /></svg>
                  </button>
                  <button className={`switch-btn list${layout === 'list' ? ' active' : ''}`} onClick={() => setLayout('list')} title="List" type="button">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="2.5" rx="1" fill="currentColor" /><rect x="1" y="6.75" width="14" height="2.5" rx="1" fill="currentColor" /><rect x="1" y="11.5" width="14" height="2.5" rx="1" fill="currentColor" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Course Grid */}
            <ul className={`learn-press-courses lp-list-courses-no-css ${layout}`}>
              {paginated.map(course => <CourseCard key={course.id} course={course} />)}
            </ul>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="learn-press-pagination navigation pagination">
                <ul className="page-numbers">
                  {currentPage > 1 && (
                    <li>
                      <button className="page-numbers prev" onClick={() => setCurrentPage(p => p - 1)}>
                        <i className="lp-icon-arrow-left">‹</i>
                      </button>
                    </li>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <li key={p}>
                      {p === currentPage
                        ? <span className="page-numbers current">{p}</span>
                        : <button className="page-numbers" onClick={() => setCurrentPage(p)}>{p}</button>
                      }
                    </li>
                  ))}
                  {currentPage < totalPages && (
                    <li>
                      <button className="page-numbers next" onClick={() => setCurrentPage(p => p + 1)}>
                        <i className="lp-icon-arrow-right">›</i>
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
