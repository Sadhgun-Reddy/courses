const fs = require('fs');

const cssToAppend = `
/* --- Dropdown Menus --- */
.thim-ekit__header__inner {
  position: relative;
}

.nav-menu li.has-dropdown {
  position: relative;
}

.nav-menu li.mega-menu-wrapper {
  position: static;
}

.dropdown-arrow {
  font-size: 10px;
  margin-left: 5px;
  opacity: 0.8;
  display: inline-block;
  vertical-align: middle;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #FFFFFF;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(15px);
  transition: all 0.3s ease;
  z-index: 101;
  padding: 20px;
  border-top: 3px solid #111FA2;
}

.nav-menu li.has-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.standard-dropdown {
  min-width: 250px;
  padding: 15px 0;
}

.dropdown-item {
  display: flex !important;
  align-items: center;
  color: #333333 !important;
  padding: 12px 25px !important;
  text-decoration: none !important;
  font-weight: 500 !important;
  transition: all 0.2s ease !important;
}

.dropdown-item::after {
  display: none !important;
}

.dropdown-item:hover {
  color: #111FA2 !important;
  background-color: #f9f9f9;
}

/* Badges */
.badge {
  font-size: 11px;
  color: #ffffff;
  padding: 2px 8px;
  border-radius: 20px;
  margin-left: auto;
  font-weight: 500;
  display: inline-block;
  border: 1px solid rgba(255,255,255,0.2);
}

.badge-hot { background: linear-gradient(70deg, #FF3B30 0%, #FF453A 48%, #FF2D55 100%); }
.badge-new { background: linear-gradient(70deg, #0033CC 0%, #1E90FF 50%, #4FACFE 100%); }
.badge-featured { background: linear-gradient(70deg, #FF2D55 0%, #AF52DE 50%, #5E5CE6 100%); margin-left: 5px; }
.badge-warning { background: linear-gradient(70deg, #FFD60A 0%, #FF9F0A 50%, #FF6B00 100%); }

/* Plugins Dropdown */
.plugins-dropdown {
  min-width: 380px;
  padding: 0;
}

.plugin-item {
  display: flex !important;
  align-items: flex-start;
  gap: 15px;
  padding: 20px !important;
  border-bottom: 1px solid #f0f0f0;
  text-decoration: none !important;
  transition: background 0.3s ease !important;
  color: inherit !important;
}

.plugin-item::after { display: none !important; }
.plugin-item:last-child { border-bottom: none; }
.plugin-item:hover { background-color: #fafafa; }
.plugin-item:hover .plugin-title { color: #111FA2; }

.plugin-icon {
  width: 45px;
  height: 45px;
  object-fit: contain;
  border-radius: 8px;
}

.plugin-icon-placeholder {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  color: #666;
  background-color: #f0f0f0;
  border-radius: 8px;
}

.plugin-info {
  flex: 1;
}

.plugin-title {
  color: #333333;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
}

.plugin-desc {
  color: #666666;
  font-size: 13.5px;
  line-height: 1.5;
}

/* Mega Menu */
.mega-menu {
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  padding: 30px;
  box-sizing: border-box;
}

.mega-col {
  flex: 1;
  padding: 0 25px;
}

.mega-col.border-right { border-right: 1px solid #eeeeee; }
.mega-col.border-left { border-left: 1px solid #eeeeee; }

.mega-title {
  font-size: 18px;
  font-weight: 600;
  color: #111111;
  margin-top: 0;
  margin-bottom: 25px;
}

.mega-icon-item {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.mega-icon-item.compact {
  margin-bottom: 20px;
}

.mega-item-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.mega-item-icon.small-icon {
  width: 24px;
  height: 24px;
  font-size: 16px;
}

.mega-item-content h6 {
  font-size: 15px;
  font-weight: 600;
  color: #111111;
  margin: 0 0 10px 0;
}

.mega-item-content h6.no-margin {
  margin-bottom: 6px;
}

.mega-item-content p {
  font-size: 14px;
  color: #555555;
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.mega-link {
  font-size: 14px;
  color: #111FA2 !important;
  font-weight: 500 !important;
  text-decoration: underline !important;
  padding: 0 !important;
  display: inline-block !important;
}

.mega-link::after { display: none !important; }
.mega-link:hover { color: #111111 !important; }

.mega-card {
  display: flex;
  flex-direction: column;
}

.mega-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
  transition: transform 0.3s ease;
}

.mega-img:hover {
  transform: translateY(-5px);
}

.mega-card-title {
  font-size: 15px;
  font-weight: 600;
  color: #111111;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.mega-card-desc {
  font-size: 14px;
  color: #555555;
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.mt-1 {
  margin-top: 5px;
}

@media (max-width: 1024px) {
  .dropdown-menu, .mega-menu {
    position: static;
    box-shadow: none;
    opacity: 1;
    visibility: visible;
    transform: none;
    border-top: none;
    display: none;
    padding: 10px;
  }
  .nav-menu li.has-dropdown:hover .dropdown-menu {
    display: block;
  }
  .mega-menu {
    flex-direction: column;
  }
  .mega-col {
    border: none !important;
    padding: 15px 0;
    border-bottom: 1px solid #eee !important;
  }
}
`;

fs.appendFileSync('./src/components/Header.css', cssToAppend);
console.log('Appended CSS successfully.');
