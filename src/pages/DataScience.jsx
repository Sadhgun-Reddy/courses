import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CourseDetail.css';
import { URLS } from '../Url';

const courseData = {
  id: 4,
  title: 'Data Science & AI',
  instructor: 'Ms. Vajeeha Taranum',
  instructorSlug: 'vajeeha-taranum',
  instructorBio: 'VOLTEDZ\nSr. IT Engineer & Data Science Expert\n\nExpert in Python, Machine Learning, Deep Learning, and AI with hands-on project experience in real-world data-driven applications and NLP systems.',
  instructorAvatar: '/wp-content/uploads/2025/11/custom-ava2.jpg',
  coInstructors: [],
  featuredImage: '/courses/Data Science & AI.png',
  price: 'paid',
  priceDisplay: '₹40,000',
  breadcrumbs: [
    { label: 'Home',          href: '/' },
    { label: 'Courses',       href: '/courses' },
    { label: 'Data Science',  href: '/courses' },
    { label: 'Data Science & AI', href: null },
  ],
  objectives:
    'Master Python, MySQL, NumPy, Pandas, Matplotlib, SciPy, Statistics, Machine Learning, Artificial Intelligence, Deep Learning with TensorFlow/Keras, and Natural Language Processing — building end-to-end data science skills for a career in the data-driven world.',
  structure: {
    duration: '16 Weeks',
    level: 'All levels',
    lessons: '15+',
    quizzes: 12,
    students: '8500',
  },
  features: [
    'End-to-end Python for Data Science — from basics to Deep Learning and NLP',
    'Hands-on ML algorithms: Linear Regression, Random Forest, KNN, K-Means & more',
    '3 months on-field support post-training and lifetime assistance',
  ],
  overview: `<h3>Overview</h3>
    <p>This comprehensive Data Science & AI course takes you from Python fundamentals all the way to building neural networks, training ML models, and implementing Natural Language Processing pipelines. You will start by learning Python programming, MySQL database connectivity, and essential data science libraries — NumPy, Pandas, Matplotlib, and SciPy.</p>
    <p>The course then covers Statistics for Data Science, the full Machine Learning pipeline with six core algorithms, Artificial Intelligence concepts, Deep Learning with TensorFlow and Keras, and finally NLP techniques including tokenization, sentiment analysis, and text classification. Every module is built for practical, hands-on application in real-world data projects.</p>`,
  curriculum: [
    {
      id: 1,
      title: 'Module 1: Introduction to Data Science',
      count: 6,
      items: [
        { id: 101, type: 'lesson', title: 'What is Data Science', duration: '45 Minutes', preview: true },
        { id: 102, type: 'lesson', title: 'Applications of Data Science', locked: true },
        { id: 103, type: 'lesson', title: 'Data Science Lifecycle', locked: true },
        { id: 104, type: 'lesson', title: 'Tools Used in Data Science', locked: true },
        { id: 105, type: 'lesson', title: 'Python for Data Science – Overview', locked: true },
        { id: 106, type: 'quiz',   title: 'Module 1 – Data Science Introduction Quiz', duration: '10 Minutes', questions: 8, locked: true },
      ],
    },
    {
      id: 2,
      title: 'Module 2: Python for Data Science',
      count: 8,
      items: [
        { id: 201, type: 'lesson', title: 'Python Basics – Variables, Data Types & Operators', locked: true },
        { id: 202, type: 'lesson', title: 'Conditional Statements', locked: true },
        { id: 203, type: 'lesson', title: 'Loops', locked: true },
        { id: 204, type: 'lesson', title: 'Functions', locked: true },
        { id: 205, type: 'lesson', title: 'Lists, Tuples, Sets & Dictionaries', locked: true },
        { id: 206, type: 'lesson', title: 'File Handling', locked: true },
        { id: 207, type: 'lesson', title: 'Object Oriented Programming (Basics)', locked: true },
        { id: 208, type: 'quiz',   title: 'Module 2 – Python for Data Science Assessment Quiz', duration: '15 Minutes', questions: 12, locked: true },
      ],
    },
    {
      id: 3,
      title: 'Module 3: Data Connectivity with MySQL',
      count: 8,
      items: [
        { id: 301, type: 'lesson', title: 'Introduction to Databases', locked: true },
        { id: 302, type: 'lesson', title: 'MySQL Basics', locked: true },
        { id: 303, type: 'lesson', title: 'SQL Queries – SELECT, INSERT, UPDATE & DELETE', locked: true },
        { id: 304, type: 'lesson', title: 'Joins and Relationships', locked: true },
        { id: 305, type: 'lesson', title: 'Connecting Python with MySQL', locked: true },
        { id: 306, type: 'lesson', title: 'CRUD Operations using Python', locked: true },
        { id: 307, type: 'lesson', title: 'Data Extraction from Database', locked: true },
        { id: 308, type: 'quiz',   title: 'Module 3 – MySQL & Python Connectivity Quiz', duration: '15 Minutes', questions: 12, locked: true },
      ],
    },
    {
      id: 4,
      title: 'Module 4: Python Libraries – NumPy',
      count: 6,
      items: [
        { id: 401, type: 'lesson', title: 'Introduction to NumPy', locked: true },
        { id: 402, type: 'lesson', title: 'Arrays and Array Operations', locked: true },
        { id: 403, type: 'lesson', title: 'Indexing and Slicing', locked: true },
        { id: 404, type: 'lesson', title: 'Mathematical Functions', locked: true },
        { id: 405, type: 'lesson', title: 'Statistical Operations with NumPy', locked: true },
        { id: 406, type: 'quiz',   title: 'Module 4 – NumPy Assessment Quiz', duration: '10 Minutes', questions: 8, locked: true },
      ],
    },
    {
      id: 5,
      title: 'Module 5: Python Libraries – Pandas',
      count: 7,
      items: [
        { id: 501, type: 'lesson', title: 'Introduction to Pandas', locked: true },
        { id: 502, type: 'lesson', title: 'Series and DataFrames', locked: true },
        { id: 503, type: 'lesson', title: 'Data Cleaning', locked: true },
        { id: 504, type: 'lesson', title: 'Data Filtering and Sorting', locked: true },
        { id: 505, type: 'lesson', title: 'GroupBy Operations', locked: true },
        { id: 506, type: 'lesson', title: 'Data Import and Export – CSV & Excel', locked: true },
        { id: 507, type: 'quiz',   title: 'Module 5 – Pandas Assessment Quiz', duration: '10 Minutes', questions: 10, locked: true },
      ],
    },
    {
      id: 6,
      title: 'Module 6: Python Libraries – Matplotlib',
      count: 7,
      items: [
        { id: 601, type: 'lesson', title: 'Introduction to Data Visualization', locked: true },
        { id: 602, type: 'lesson', title: 'Line Charts', locked: true },
        { id: 603, type: 'lesson', title: 'Bar Charts', locked: true },
        { id: 604, type: 'lesson', title: 'Pie Charts', locked: true },
        { id: 605, type: 'lesson', title: 'Histograms', locked: true },
        { id: 606, type: 'lesson', title: 'Scatter Plots', locked: true },
        { id: 607, type: 'quiz',   title: 'Module 6 – Matplotlib Assessment Quiz', duration: '10 Minutes', questions: 8, locked: true },
      ],
    },
    {
      id: 7,
      title: 'Module 7: Python Libraries – SciPy',
      count: 5,
      items: [
        { id: 701, type: 'lesson', title: 'Scientific Computing Concepts', locked: true },
        { id: 702, type: 'lesson', title: 'Optimization with SciPy', locked: true },
        { id: 703, type: 'lesson', title: 'Integration with SciPy', locked: true },
        { id: 704, type: 'lesson', title: 'Statistical Functions in SciPy', locked: true },
        { id: 705, type: 'quiz',   title: 'Module 7 – SciPy Assessment Quiz', duration: '10 Minutes', questions: 8, locked: true },
      ],
    },
    {
      id: 8,
      title: 'Module 8: Statistics for Data Science',
      count: 8,
      items: [
        { id: 801, type: 'lesson', title: 'Mean, Median & Mode', locked: true },
        { id: 802, type: 'lesson', title: 'Standard Deviation', locked: true },
        { id: 803, type: 'lesson', title: 'Variance', locked: true },
        { id: 804, type: 'lesson', title: 'Probability Basics', locked: true },
        { id: 805, type: 'lesson', title: 'Correlation', locked: true },
        { id: 806, type: 'lesson', title: 'Normal Distribution', locked: true },
        { id: 807, type: 'lesson', title: 'Hypothesis Testing', locked: true },
        { id: 808, type: 'quiz',   title: 'Module 8 – Statistics Assessment Quiz', duration: '15 Minutes', questions: 12, locked: true },
      ],
    },
    {
      id: 9,
      title: 'Module 9: Machine Learning',
      count: 9,
      items: [
        { id: 901, type: 'lesson', title: 'Introduction to Machine Learning', locked: true },
        { id: 902, type: 'lesson', title: 'Types of ML – Supervised, Unsupervised & Reinforcement Learning', locked: true },
        { id: 903, type: 'lesson', title: 'Algorithm – Linear Regression', locked: true },
        { id: 904, type: 'lesson', title: 'Algorithm – Logistic Regression', locked: true },
        { id: 905, type: 'lesson', title: 'Algorithm – Decision Tree', locked: true },
        { id: 906, type: 'lesson', title: 'Algorithm – Random Forest', locked: true },
        { id: 907, type: 'lesson', title: 'Algorithm – K-Means Clustering', locked: true },
        { id: 908, type: 'lesson', title: 'Algorithm – K-Nearest Neighbors (KNN)', locked: true },
        { id: 909, type: 'quiz',   title: 'Module 9 – Machine Learning Assessment Quiz', duration: '20 Minutes', questions: 15, locked: true },
      ],
    },
    {
      id: 10,
      title: 'Module 10: Artificial Intelligence',
      count: 5,
      items: [
        { id: 1001, type: 'lesson', title: 'Introduction to Artificial Intelligence', locked: true },
        { id: 1002, type: 'lesson', title: 'AI Applications', locked: true },
        { id: 1003, type: 'lesson', title: 'Intelligent Systems', locked: true },
        { id: 1004, type: 'lesson', title: 'AI vs Machine Learning', locked: true },
        { id: 1005, type: 'quiz',   title: 'Module 10 – Artificial Intelligence Assessment Quiz', duration: '10 Minutes', questions: 8, locked: true },
      ],
    },
    {
      id: 11,
      title: 'Module 11: Deep Learning',
      count: 6,
      items: [
        { id: 1101, type: 'lesson', title: 'Introduction to Deep Learning', locked: true },
        { id: 1102, type: 'lesson', title: 'Neural Networks Basics', locked: true },
        { id: 1103, type: 'lesson', title: 'Activation Functions', locked: true },
        { id: 1104, type: 'lesson', title: 'TensorFlow & Keras – Introduction', locked: true },
        { id: 1105, type: 'lesson', title: 'Building Simple Neural Networks', locked: true },
        { id: 1106, type: 'quiz',   title: 'Module 11 – Deep Learning Assessment Quiz', duration: '15 Minutes', questions: 12, locked: true },
      ],
    },
    {
      id: 12,
      title: 'Module 12: Natural Language Processing (NLP)',
      count: 8,
      items: [
        { id: 1201, type: 'lesson', title: 'Introduction to NLP', locked: true },
        { id: 1202, type: 'lesson', title: 'Text Processing', locked: true },
        { id: 1203, type: 'lesson', title: 'Tokenization', locked: true },
        { id: 1204, type: 'lesson', title: 'Stop Words Removal', locked: true },
        { id: 1205, type: 'lesson', title: 'Stemming and Lemmatization', locked: true },
        { id: 1206, type: 'lesson', title: 'Sentiment Analysis', locked: true },
        { id: 1207, type: 'lesson', title: 'Text Classification', locked: true },
        { id: 1208, type: 'quiz',   title: 'Module 12 – NLP Final Assessment Quiz', duration: '20 Minutes', questions: 15, locked: true },
      ],
    },
  ],
  students: [
    { name: 'Arjun V.',  progress: 70,  avatar: 'https://secure.gravatar.com/avatar/ee4ae5e45b778f6dd7303785b2f860bd42db7de37895934373d462a5445b0aae?s=250&d=mm&r=g' },
    { name: 'Meena L.',  progress: 100, avatar: 'https://secure.gravatar.com/avatar/8ee1f011bb5b9e464560e252b03aa580b722ade51dd178e8d8a149294d58a60f?s=250&d=mm&r=g' },
  ],
  rating: 5.0,
  ratingCount: 14,
  ratingBreakdown: [
    { star: 5, count: 12 },
    { star: 4, count: 2 },
    { star: 3, count: 0 },
    { star: 2, count: 0 },
    { star: 1, count: 0 },
  ],
  reviews: [
    {
      author: 'Arjun V.',
      avatar: 'https://secure.gravatar.com/avatar/ee4ae5e45b778f6dd7303785b2f860bd42db7de37895934373d462a5445b0aae?s=250&d=mm&r=g',
      rating: 5,
      date: 'March 20, 2026',
      title: 'Complete Data Science Journey in One Course',
      content: 'From Python basics all the way to NLP and Deep Learning — this course covers everything. The ML algorithms module and TensorFlow hands-on sessions were exceptional.',
    },
    {
      author: 'Meena L.',
      avatar: 'https://secure.gravatar.com/avatar/8ee1f011bb5b9e464560e252b03aa580b722ade51dd178e8d8a149294d58a60f?s=250&d=mm&r=g',
      rating: 5,
      date: 'March 14, 2026',
      title: 'Pandas & Matplotlib Made Data Analysis Fun',
      content: 'The Pandas GroupBy and Matplotlib visualization sessions were fantastic. I can now clean and visualize datasets independently. The MySQL connectivity module was an unexpected but very useful addition.',
    },
    {
      author: 'Rohan D.',
      avatar: 'https://secure.gravatar.com/avatar/3a5b2c1d4e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2?s=250&d=mm&r=g',
      rating: 5,
      date: 'March 6, 2026',
      title: 'Machine Learning Algorithms Explained Practically',
      content: 'Random Forest, KNN, and K-Means were all demonstrated on real datasets. Seeing the decision boundaries visually and tuning hyperparameters live was a breakthrough moment for me.',
    },
    {
      author: 'Teja S.',
      avatar: 'https://secure.gravatar.com/avatar/6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7?s=250&d=mm&r=g',
      rating: 5,
      date: 'February 26, 2026',
      title: 'Statistics Module Built a Solid Foundation',
      content: 'Normal distribution, hypothesis testing, and correlation were explained brilliantly with real examples. I now finally understand what statistical significance means in a data science context.',
    },
    {
      author: 'Bhavana C.',
      avatar: 'https://secure.gravatar.com/avatar/9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0?s=250&d=mm&r=g',
      rating: 5,
      date: 'February 18, 2026',
      title: 'NLP Module Was the Best Part',
      content: 'Sentiment analysis and text classification using Python were my personal favourites. The tokenization and lemmatization exercises on real tweet data made it incredibly engaging.',
    },
    {
      author: 'Sunil P.',
      avatar: 'https://secure.gravatar.com/avatar/d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e?s=250&d=mm&r=g',
      rating: 5,
      date: 'February 10, 2026',
      title: 'TensorFlow Neural Network Labs Were Amazing',
      content: 'Building a neural network from scratch with Keras and watching it train in real-time was mind-blowing. The activation functions comparison with visual demos was something I have not seen elsewhere.',
    },
    {
      author: 'Gayatri R.',
      avatar: 'https://secure.gravatar.com/avatar/e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f?s=250&d=mm&r=g',
      rating: 5,
      date: 'February 2, 2026',
      title: 'NumPy and SciPy Gave Me Numerical Superpowers',
      content: 'The NumPy array operations and SciPy optimization sessions transformed how I approach numerical problems in Python. Combined with Pandas, I can now handle any dataset professionally.',
    },
    {
      author: 'Kartik M.',
      avatar: 'https://secure.gravatar.com/avatar/f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a?s=250&d=mm&r=g',
      rating: 5,
      date: 'January 25, 2026',
      title: 'Python OOP Basics Were Well Paced',
      content: 'Even though I was a Python beginner, the structured progression from variables and loops to OOP concepts and file handling never felt overwhelming. Perfect pacing for career changers.',
    },
    {
      author: 'Swathi B.',
      avatar: 'https://secure.gravatar.com/avatar/a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b?s=250&d=mm&r=g',
      rating: 5,
      date: 'January 17, 2026',
      title: 'AI vs ML Section Cleared All Confusion',
      content: 'I had always been confused about where AI ends and ML begins. The dedicated AI module with intelligent systems and real-world AI application examples made everything crystal clear.',
    },
    {
      author: 'Praveen J.',
      avatar: 'https://secure.gravatar.com/avatar/b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c?s=250&d=mm&r=g',
      rating: 5,
      date: 'January 9, 2026',
      title: 'MySQL + Python CRUD Was Very Practical',
      content: 'The entire MySQL connectivity module — from SQL JOIN queries to Python CRUD operations and data extraction — was taught with real database projects. This alone made the course worth enrolling.',
    },
    {
      author: 'Asha G.',
      avatar: 'https://secure.gravatar.com/avatar/c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d?s=250&d=mm&r=g',
      rating: 5,
      date: 'January 1, 2026',
      title: 'Data Science Lifecycle Framing Was Perfect',
      content: 'Starting the course with the full Data Science lifecycle gave me an end-to-end mental model before diving into tools. The tools overview at the beginning helped me understand how everything connects.',
    },
    {
      author: 'Vamsi K.',
      avatar: 'https://secure.gravatar.com/avatar/d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e?s=250&d=mm&r=g',
      rating: 4,
      date: 'December 22, 2025',
      title: 'Excellent Course – Would Add More Deep Learning',
      content: 'The course is comprehensive across all areas. My only wish is to expand the Deep Learning module with CNNs and RNNs in a future version. Everything else including the NLP section was superb.',
    },
    {
      author: 'Sirisha T.',
      avatar: 'https://secure.gravatar.com/avatar/e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f?s=250&d=mm&r=g',
      rating: 4,
      date: 'December 14, 2025',
      title: 'Great Overall – More Reinforcement Learning Please',
      content: 'A very solid Data Science course. The ML section introduced Reinforcement Learning conceptually but I would love a hands-on lab for it in future batches. The regression and clustering labs were perfect.',
    },
  ],
  featuredReview:
    'The most structured Data Science course I have taken. Covering Python, MySQL, all four major libraries, Statistics, Machine Learning, AI, Deep Learning, and NLP in a single program is remarkable. The practical projects made concepts crystal clear!',
};


/* ─────────────────── STAR RATING ─────────────────── */
function StarRating({ rating, size = 16 }) {
  return (
    <div className="cd-stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`cd-star ${s <= rating ? 'filled' : ''}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={s <= rating ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </span>
      ))}
    </div>
  );
}


/* ─────────────────── SIDEBAR ─────────────────── */
function CourseSidebar({ course }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
  });
  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const certBrands = ['Python', 'TensorFlow', 'Keras', 'scikit-learn', 'MySQL', 'NumPy', 'Pandas'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'description') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(URLS.ContactByCourse, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          course: course.title,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitMessage('Enquiry submitted successfully!');
        setFormData({ name: '', email: '', phone: '', description: '' });
        setCharCount(0);
      } else {
        setSubmitMessage(data.message || 'Failed to submit enquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setSubmitMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside className="cd-sidebar">
      <div className="cd-sidebar-inner">

        {/* Meta card */}
        <div className="cd-sidebar-meta">
          {[
            { icon: '⏱', label: 'Duration', value: course.structure.duration },
            { icon: '📊', label: 'Level',    value: course.structure.level },
            { icon: '📚', label: 'Modules',  value: `${course.structure.lessons} Modules` },
            { icon: '👥', label: 'Students', value: `${course.structure.students}+ Enrolled` },
          ].map(({ icon, label, value }) => (
            <div className="cd-meta-row" key={label}>
              <span className="cd-meta-icon">{icon}</span>
              <div className="cd-meta-text">
                <span className="cd-meta-label">{label}</span>
                <span className="cd-meta-value">{value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Batch timings */}
        <div className="cd-sidebar-section">
          <h5 className="cd-sidebar-heading">Batches &amp; Timing</h5>
          <div className="cd-batch-group">
            <p className="cd-batch-label">Regular Batches: Mon – Fri</p>
            <ul className="cd-batch-list">
              <li>9:00 AM – 11:00 AM</li>
              <li>11:00 AM – 01:00 PM</li>
              <li>02:00 PM – 04:00 PM</li>
              <li>04:00 PM – 06:00 PM</li>
            </ul>
          </div>
          <div className="cd-batch-group">
            <p className="cd-batch-label">Weekend Batches: Sat &amp; Sun</p>
            <ul className="cd-batch-list">
              <li>9:00 AM – 1:00 PM</li>
            </ul>
          </div>
          <div className="cd-batch-group">
            <p className="cd-batch-label">Online Timings</p>
            <ul className="cd-batch-list">
              <li>6:00 PM – 7:00 PM</li>
            </ul>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="cd-sidebar-ctas">
          <button className="cd-cta-whatsapp">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Enquiry
          </button>
          <button className="cd-cta-phone">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.62-.62a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            Phone Enquiry
          </button>
        </div>

        {/* Who should enroll */}
        <div className="cd-sidebar-section">
          <h5 className="cd-sidebar-heading">Who Should Enroll?</h5>
          <p className="cd-sidebar-text">
            Most suited for freshers, graduates, and career changers. Specially designed for
            individuals looking to enter the Data Science, AI, or Machine Learning field with
            zero prior experience.
          </p>
        </div>

        {/* Course highlights */}
        <div className="cd-sidebar-section">
          <h5 className="cd-sidebar-heading">Course Highlights</h5>
          <ul className="cd-features-list">
            {course.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>

        {/* Certifications */}
        <div className="cd-sidebar-section">
          <h5 className="cd-sidebar-heading">Tools &amp; Technologies</h5>
          <div className="cd-cert-badges">
            {certBrands.map((b) => (
              <span key={b} className="cd-cert-badge">{b}</span>
            ))}
          </div>
        </div>

        {/* Quick contact form */}
        <div className="cd-sidebar-section">
          <h5 className="cd-sidebar-heading">Quick Contact</h5>
          <form className="cd-contact-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name"
              placeholder="Name *" 
              value={formData.name}
              onChange={handleInputChange}
              required 
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email *" 
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
            <input 
              type="tel" 
              name="phone"
              placeholder="Phone *" 
              value={formData.phone}
              onChange={handleInputChange}
              required 
            />
            <div className="cd-textarea-wrap">
              <textarea
                name="description"
                placeholder="Message"
                rows={3}
                maxLength={300}
                value={formData.description}
                onChange={handleInputChange}
              />
              <span className="cd-char-count">{charCount} / 300</span>
            </div>
            <button type="submit" className="cd-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>
            {submitMessage && (
              <p 
                className={`cd-submit-message ${submitMessage.includes('success') ? 'success' : 'error'}`} 
                style={{
                  fontSize: '13px', 
                  marginTop: '10px', 
                  color: submitMessage.includes('success') ? '#25D366' : '#d32f2f'
                }}
              >
                {submitMessage}
              </p>
            )}
          </form>
        </div>

      </div>
    </aside>
  );
}


/* ─────────────────── MAIN COMPONENT ─────────────────── */
export default function CourseDetail() {
  const course = courseData;

  return (
    <div className="cd-page">

      {/* Breadcrumb banner */}
      <div className="cd-banner">
        <div className="cd-banner-inner">
          <ul className="cd-breadcrumbs">
            {course.breadcrumbs.map((b, i) => (
              <li key={i}>
                {b.href ? <Link  to={b.href}>{b.label}</Link> : <span>{b.label}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Course Header (full-width, outside cd-layout) ── */}
      <div className="cd-header-top">
        <h1 className="cd-title">{course.title}</h1>
        <h2 className="cd-tech-subtitle">
          Python, MySQL, NumPy, Pandas, Matplotlib, SciPy, Statistics, Machine Learning, AI, Deep Learning &amp; NLP
        </h2>
        <p className="cd-instructor-line">
          INSTRUCTOR:{' '}
          <Link  to={`/instructors/${course.instructorSlug}`} className="cd-instructor-name">
            {course.instructor}
          </Link>
        </p>
        <div className="cd-featured-img-wrap">
          <img src={course.featuredImage} alt={course.title} className="cd-featured-img" />
        </div>
      </div>

      {/* Page body */}
      <div className="cd-layout">
        <div className="cd-main">

          {/* ── Overview ── */}
          <section className="cd-overview-section">
            <h3 className="cd-section-title">Overview</h3>
            <div
              className="cd-overview-text"
              dangerouslySetInnerHTML={{
                __html: course.overview.replace('<h3>Overview</h3>', ''),
              }}
            />
          </section>

          {/* ── Program intro with module preview ── */}
          <section className="cd-program-section">
            <h2 className="cd-program-heading">
              {course.title}&nbsp;|&nbsp;Duration {course.structure.duration}
            </h2>
            <p className="cd-program-desc">
              The training program is broadly divided into {course.curriculum.length} modules.
              Each module is delivered by industry experts with hands-on practical sessions.
              Our curriculum is designed to take participants from Python fundamentals to
              advanced AI and NLP — making them fully job-ready for data-driven roles.
            </p>
            <p className="cd-modules-label">Major modules covered in this training:</p>
            <ul className="cd-modules-preview">
              {course.curriculum.map((mod) => (
                <li key={mod.id}>{mod.title}</li>
              ))}
            </ul>
          </section>

          {/* ── Curriculum — flat expanded ── */}
          <section className="cd-curriculum-section">
            {course.curriculum.map((section) => (
              <div key={section.id} className="cd-module-block">
                <h3 className="cd-module-heading">{section.title}</h3>
                <ul className="cd-module-topics">
                  {section.items
                    .filter((item) => item.type === 'lesson')
                    .map((item) => (
                      <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
              </div>
            ))}
          </section>

          {/* ── Instructor ── */}
          <section className="cd-instructor-section">
            <h3 className="cd-section-title">About the Instructor</h3>
            <div className="cd-instructor-entry">
              <img
                src={course.instructorAvatar}
                alt={course.instructor}
                className="cd-instructor-avatar"
              />
              <div className="cd-instructor-details">
                <h4 className="cd-instructor-title">
                  <Link  to={`/instructors/${course.instructorSlug}`}>{course.instructor}</Link>
                </h4>
                <div className="cd-instructor-bio">
                  {course.instructorBio.split('\n').map((line, i) =>
                    line ? <p key={i}>{line}</p> : <br key={i} />
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ── Reviews ── */}
          <section className="cd-reviews-section">
            <h3 className="cd-section-title">Student Reviews</h3>
            <div className="cd-rating-summary">
              <div className="cd-rating-score">
                <div className="cd-rating-value">{course.rating.toFixed(1)}</div>
                <StarRating rating={course.rating} size={20} />
                <div className="cd-rating-count">{course.ratingCount} ratings</div>
              </div>
              <div className="cd-rating-bars">
                {course.ratingBreakdown.map((r) => (
                  <div key={r.star} className="cd-rating-row">
                    <span className="cd-rating-star-num">{r.star}</span>
                    <span className="cd-rating-star-icon">★</span>
                    <div className="cd-rating-bar-bg">
                      <div
                        className="cd-rating-bar-fill"
                        style={{
                          width:
                            course.ratingCount > 0
                              ? `${(r.count / course.ratingCount) * 100}%`
                              : '0%',
                        }}
                      />
                    </div>
                    <span className="cd-rating-bar-count">{r.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <ul className="cd-reviews-list">
              {course.reviews.map((r, i) => (
                <li key={i} className="cd-review">
                  <img src={r.avatar} alt={r.author} className="cd-review-avatar" />
                  <div className="cd-review-body">
                    <div className="cd-review-meta">
                      <StarRating rating={r.rating} size={14} />
                      <span className="cd-review-author">{r.author}</span>
                      <span className="cd-review-date">{r.date}</span>
                    </div>
                    <h5 className="cd-review-title">{r.title}</h5>
                    <p className="cd-review-content">{r.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

        </div>

        <CourseSidebar course={course} />
      </div>
    </div>
  );
}