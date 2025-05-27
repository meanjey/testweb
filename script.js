/*
========================================
页面加载完成后执行
========================================
*/
document.addEventListener('DOMContentLoaded', function() {
  // 页面加载效果
  setTimeout(function() {
    const loader = document.querySelector('.loader-wrapper');
    loader.classList.add('fade-out');
    
    // 在加载消失后激活动画效果
    setTimeout(function() {
      // 初始化所有带有 data-aos 属性的元素，添加动画效果
      document.querySelectorAll('[data-aos]').forEach(element => {
        element.classList.add('aos-animate');
      });
      
      // 初始化技能进度条动画
      initSkillBars();
      
      // 初始化内容淡入效果
      initFadeInElements();
    }, 500);
  }, 1000); // 加载动画时间
  
  // 初始化打字机效果（仅在首页执行）
  if (document.getElementById('typing-text')) {
    initTypeWriter();
  }
  
  // 初始化粒子背景
  initParticles();
  
  // 初始化导航栏效果
  initNavbar();
  
  // 初始化暗色/亮色模式切换
  initThemeToggle();
  
  // 初始化汉堡菜单
  initMobileMenu();
  
  // 初始化联系表单（仅在联系页面执行）
  if (document.getElementById('contactForm')) {
    initContactForm();
  }
  
  // 初始化页面过渡效果
  initPageTransition();
  
  // 初始化滚动进度指示器
  initScrollProgress();
  
  // 初始化多语言支持
  initLanguageToggle();
});

/*
========================================
打字机效果
========================================
*/
function initTypeWriter() {
  const textElement = document.getElementById('typing-text');
  const texts = ['开发者', '设计师', 'AI爱好者', '创新者'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      // 删除文字
      textElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 80; // 删除速度快一点
    } else {
      // 添加文字
      textElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 150; // 打字速度慢一点
    }
    
    // 当前单词打字完成
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 1000; // 在删除前暂停一下
    }
    
    // 单词已删除完，切换到下一个单词
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
    
    setTimeout(type, typingSpeed);
  }
  
  if (textElement) {
    type();
  }
}

/*
========================================
粒子背景效果
========================================
*/
function initParticles() {
  if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#3498db'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          },
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#3498db',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
}

/*
========================================
导航栏效果
========================================
*/
function initNavbar() {
  const navbar = document.getElementById('navbar');
  
  // 导航栏滚动效果
  window.addEventListener('scroll', function() {
    // 滚动后导航栏变深色
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // 获取当前页面路径
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';
  
  // 设置当前页面对应的导航链接为激活状态
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage) {
      link.classList.add('active');
    }
  });
  
  // 首页特殊处理：滚动到不同部分按钮
  if (currentPage === 'index.html' || currentPage === '') {
    const scrollDownBtn = document.querySelector('.scroll-down-btn');
    if (scrollDownBtn) {
      scrollDownBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const navbarHeight = navbar.offsetHeight;
          const targetPosition = targetSection.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    }
  }
}

/*
========================================
技能进度条动画
========================================
*/
function initSkillBars() {
  const progressBars = document.querySelectorAll('.progress');
  
  if (progressBars.length > 0) {
    progressBars.forEach(bar => {
      const width = bar.style.width;
      
      // 先设置宽度为0
      bar.style.width = '0';
      
      // 然后动画到目标宽度
      setTimeout(() => {
        bar.style.width = width;
      }, 300);
    });
  }
}

/*
========================================
暗色/亮色模式切换
========================================
*/
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  
  // 检查本地存储中是否有保存的主题偏好
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    // 保存主题偏好到本地存储
    if (document.body.classList.contains('light-mode')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
    
    // 如果粒子背景已初始化，切换主题时更新粒子颜色
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
      const isLightMode = document.body.classList.contains('light-mode');
      
      // 更新粒子颜色
      pJSDom[0].pJS.particles.color.value = isLightMode ? '#2196F3' : '#3498db';
      pJSDom[0].pJS.particles.line_linked.color = isLightMode ? '#2196F3' : '#3498db';
      
      // 应用更改
      pJSDom[0].pJS.fn.particlesRefresh();
    }
  });
}

/*
========================================
移动端菜单
========================================
*/
function initMobileMenu() {
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
  });
}

/*
========================================
联系表单处理
========================================
*/
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 获取表单数据
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // 在实际应用中，这里应该发送数据到服务器
    // 这里只是模拟提交成功
    alert(`感谢您的留言，${name}！我们会尽快回复您。`);
    
    // 重置表单
    contactForm.reset();
  });
}

/*
========================================
内容淡入动画
========================================
*/
function initFadeInElements() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (fadeElements.length > 0) {
    // 初始显示已在视口内的元素
    checkFadeInElements();
    
    // 滚动时检查元素
    window.addEventListener('scroll', checkFadeInElements);
  }
  
  function checkFadeInElements() {
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150; // 元素距离视口底部多远时触发动画
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
  }
}

/*
========================================
页面过渡动画
========================================
*/
function initPageTransition() {
  // 创建页面过渡元素
  if (!document.querySelector('.page-transition')) {
    const transitionElement = document.createElement('div');
    transitionElement.className = 'page-transition';
    document.body.appendChild(transitionElement);
  }
  
  // 为所有导航链接添加过渡效果
  document.querySelectorAll('a').forEach(link => {
    // 排除外部链接和锚点链接
    const href = link.getAttribute('href');
    if (href && href.indexOf('#') !== 0 && href.indexOf('http') !== 0) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        
        // 激活过渡动画
        const transition = document.querySelector('.page-transition');
        transition.classList.add('active');
        
        // 动画结束后跳转
        setTimeout(() => {
          window.location.href = target;
        }, 600);
      });
    }
  });
  
  // 页面加载时的入场动画
  window.addEventListener('pageshow', function(event) {
    // 如果是从缓存加载的页面，也应用动画
    if (event.persisted) {
      const transition = document.querySelector('.page-transition');
      transition.classList.add('active');
      setTimeout(() => {
        transition.classList.add('fade-out');
        setTimeout(() => {
          transition.classList.remove('active', 'fade-out');
        }, 600);
      }, 10);
    }
  });
}

/*
========================================
滚动进度指示器
========================================
*/
function initScrollProgress() {
  // 创建进度条元素
  if (!document.querySelector('.scroll-progress')) {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
  }
  
  // 更新进度条
  function updateProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-progress').style.width = scrolled + '%';
  }
  
  // 监听滚动事件
  window.addEventListener('scroll', updateProgress);
}

/*
========================================
多语言支持
========================================
*/
function initLanguageToggle() {
  const langToggle = document.querySelector('.lang-toggle');
  const langOptions = document.querySelectorAll('.lang-option');
  const langDisplay = document.querySelector('.lang-toggle > span');
  
  // 检查本地存储中是否有保存的语言偏好
  const savedLang = localStorage.getItem('language') || 'zh';
  setLanguage(savedLang);
  
  // 为语言选项添加点击事件
  langOptions.forEach(option => {
    option.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      setLanguage(lang);
      
      // 保存语言偏好到本地存储
      localStorage.setItem('language', lang);
    });
  });
  
  function setLanguage(lang) {
    // 更新显示的语言标识
    if (lang === 'zh') {
      langDisplay.textContent = '中';
    } else if (lang === 'en') {
      langDisplay.textContent = 'EN';
    }
    
    // 更新激活状态
    langOptions.forEach(option => {
      if (option.getAttribute('data-lang') === lang) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
    
    // 设置HTML的lang属性
    document.documentElement.lang = lang;
    
    // 应用翻译
    applyTranslations(lang);
  }
  
  // 应用翻译到页面元素
  function applyTranslations(lang) {
    // 确保translations对象存在
    if (typeof translations === 'undefined' || !translations[lang]) {
      console.error('翻译数据不可用');
      return;
    }
    
    const trans = translations[lang];
    const currentPage = getCurrentPage();
    
    // 更新页面标题
    document.title = `${trans.nav[currentPage] || '个人主页'} | ${currentPage === 'home' ? trans.nav.home : trans.nav[currentPage]}`;
    
    // 更新导航链接
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      const page = href.split('.')[0];
      const navKey = page === 'index' ? 'home' : page;
      if (trans.nav[navKey]) {
        link.textContent = trans.nav[navKey];
      }
    });
    
    // 更新加载文本
    const loadingText = document.querySelector('.loader-wrapper p');
    if (loadingText) {
      loadingText.textContent = trans.loading;
    }
    
    // 更新页脚版权信息
    const copyright = document.querySelector('.footer-content p');
    if (copyright) {
      copyright.textContent = `© 2024 ${trans.nav.home}. ${trans.footer.copyright}.`;
    }
    
    // 根据当前页面更新特定内容
    switch (currentPage) {
      case 'home':
        updateHomePage(trans);
        break;
      case 'about':
        updateAboutPage(trans);
        break;
      case 'skills':
        updateSkillsPage(trans);
        break;
      case 'projects':
        updateProjectsPage(trans);
        break;
      case 'contact':
        updateContactPage(trans);
        break;
    }
  }
  
  // 获取当前页面
  function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0];
    return page === 'index' || page === '' ? 'home' : page;
  }
  
  // 更新首页内容
  function updateHomePage(trans) {
    // 更新标题和欢迎文本
    const title = document.querySelector('.hero-text .title');
    const subtitle = document.querySelector('.hero-text .subtitle');
    const viewProjectsBtn = document.querySelector('.primary-btn');
    const contactMeBtn = document.querySelector('.secondary-btn');
    
    if (title) {
      title.innerHTML = `${trans.home.greeting} <span class="highlight-text">刘明杰</span>`;
    }
    
    if (subtitle) {
      subtitle.textContent = trans.home.welcome;
    }
    
    if (viewProjectsBtn) {
      viewProjectsBtn.textContent = trans.home.viewProjects;
    }
    
    if (contactMeBtn) {
      contactMeBtn.textContent = trans.home.contactMe;
    }
    
    // 更新打字机效果的文本
    if (window.typewriterTexts) {
      window.typewriterTexts = trans.home.roles;
    }
  }
  
  // 更新关于我页面内容
  function updateAboutPage(trans) {
    // 实现关于页面的翻译更新
    if (document.querySelector('#about')) {
      const title = document.querySelector('#about .section-title');
      if (title) title.textContent = trans.about.title;
      
      // 更新"我是谁"部分
      const whoAmI = document.querySelector('#about h3:nth-of-type(1)');
      const whoAmIDesc = document.querySelector('#about h3:nth-of-type(1) + p');
      if (whoAmI) whoAmI.textContent = trans.about.whoAmI;
      if (whoAmIDesc) whoAmIDesc.textContent = trans.about.whoAmIDesc;
      
      // 更新"我擅长什么"部分
      const whatIDo = document.querySelector('#about h3:nth-of-type(2)');
      const whatIDoDesc = document.querySelector('#about h3:nth-of-type(2) + p');
      if (whatIDo) whatIDo.textContent = trans.about.whatIDo;
      if (whatIDoDesc) whatIDoDesc.textContent = trans.about.whatIDoDesc;
      
      // 更新个人信息项
      const infoItems = document.querySelectorAll('.info-item span');
      if (infoItems.length >= 3) {
        infoItems[0].textContent = trans.about.student;
        infoItems[1].textContent = trans.about.programmer;
        infoItems[2].textContent = trans.about.aiEnthusiast;
      }
      
      // 更新教育经历
      const eduTitle = document.querySelector('.education-section .sub-section-title');
      if (eduTitle) eduTitle.textContent = trans.about.education;
      
      const degree = document.querySelector('.timeline-item h4');
      const university = document.querySelector('.timeline-item p:nth-of-type(2)');
      const eduDesc = document.querySelector('.timeline-item p:nth-of-type(3)');
      
      if (degree) degree.textContent = trans.about.degree;
      if (university) university.textContent = trans.about.university;
      if (eduDesc) eduDesc.textContent = trans.about.eduDesc;
      
      // 更新兴趣爱好
      const interestsTitle = document.querySelector('.interests-section .sub-section-title');
      if (interestsTitle) interestsTitle.textContent = trans.about.interests;
      
      const interestItems = document.querySelectorAll('.interest-item p');
      if (interestItems.length >= 4) {
        interestItems[0].textContent = trans.about.coding;
        interestItems[1].textContent = trans.about.ai;
        interestItems[2].textContent = trans.about.reading;
        interestItems[3].textContent = trans.about.music;
      }
    }
  }
  
  // 更新技能页面内容
  function updateSkillsPage(trans) {
    // 实现技能页面的翻译更新
    if (document.querySelector('#skills')) {
      const title = document.querySelector('#skills .section-title');
      if (title) title.textContent = trans.skills.title;
      
      // 更新技能类别标题
      const categoryTitles = document.querySelectorAll('.category-title');
      if (categoryTitles.length >= 4) {
        categoryTitles[0].textContent = trans.skills.progLang;
        categoryTitles[1].textContent = trans.skills.frameworks;
        categoryTitles[2].textContent = trans.skills.profSkills;
        categoryTitles[3].textContent = trans.skills.languages;
      }
      
      // 更新专业技能图标文本
      const skillIcons = document.querySelectorAll('.skill-icon p');
      if (skillIcons.length >= 6) {
        skillIcons[0].textContent = trans.skills.webDev;
        skillIcons[1].textContent = trans.skills.machineLearning;
        skillIcons[2].textContent = trans.skills.computerVision;
        skillIcons[3].textContent = trans.skills.dataAnalysis;
        skillIcons[4].textContent = trans.skills.dataViz;
        skillIcons[5].textContent = trans.skills.trafficEng;
      }
      
      // 更新语言能力
      const languageNames = document.querySelectorAll('.skill-category:last-child .skill-name');
      if (languageNames.length >= 2) {
        languageNames[0].textContent = trans.skills.chinese;
        languageNames[1].textContent = trans.skills.english;
      }
    }
  }
  
  // 更新项目页面内容
  function updateProjectsPage(trans) {
    // 实现项目页面的翻译更新
    if (document.querySelector('#projects')) {
      const title = document.querySelector('#projects .section-title');
      if (title) title.textContent = trans.projects.title;
      
      // 更新项目卡片
      const projectTitles = document.querySelectorAll('.project-title');
      const projectDescs = document.querySelectorAll('.project-description');
      
      if (projectTitles.length >= 4 && projectDescs.length >= 4) {
        // 项目1
        projectTitles[0].textContent = trans.projects.trafficMonitor;
        projectDescs[0].textContent = trans.projects.trafficMonitorDesc;
        
        // 项目2
        projectTitles[1].textContent = trans.projects.dataViz;
        projectDescs[1].textContent = trans.projects.dataVizDesc;
        
        // 项目3
        projectTitles[2].textContent = trans.projects.blog;
        projectDescs[2].textContent = trans.projects.blogDesc;
        
        // 项目4
        projectTitles[3].textContent = trans.projects.aiAssistant;
        projectDescs[3].textContent = trans.projects.aiAssistantDesc;
      }
      
      // 更新"查看更多"按钮
      const viewMoreBtn = document.querySelector('.more-projects .btn');
      if (viewMoreBtn) viewMoreBtn.textContent = trans.projects.viewMore;
    }
  }
  
  // 更新联系页面内容
  function updateContactPage(trans) {
    // 实现联系页面的翻译更新
    if (document.querySelector('#contact')) {
      const title = document.querySelector('#contact .section-title');
      if (title) title.textContent = trans.contact.title;
      
      // 更新联系信息
      const subtitle = document.querySelector('.contact-info > p');
      if (subtitle) subtitle.textContent = trans.contact.subtitle;
      
      const contactInfoTitle = document.querySelector('.contact-info > h3');
      if (contactInfoTitle) contactInfoTitle.textContent = trans.contact.contactInfo;
      
      // 更新联系项
      const contactHeaders = document.querySelectorAll('.contact-text h4');
      if (contactHeaders.length >= 3) {
        contactHeaders[0].textContent = trans.contact.email;
        contactHeaders[1].textContent = trans.contact.wechat;
      }
      
      // 更新微信扫码文本
      const wechatScan = document.querySelector('.wechat-container > p');
      if (wechatScan) wechatScan.textContent = trans.contact.wechatScan;
      
      // 更新表单
      const formTitle = document.querySelector('.contact-form-container > h3');
      if (formTitle) formTitle.textContent = trans.contact.sendMessage;
      
      const formLabels = document.querySelectorAll('.form-group label');
      if (formLabels.length >= 4) {
        formLabels[0].textContent = trans.contact.name;
        formLabels[1].textContent = trans.contact.email;
        formLabels[2].textContent = trans.contact.subject;
        formLabels[3].textContent = trans.contact.message;
      }
      
      const sendBtn = document.querySelector('.contact-form button');
      if (sendBtn) sendBtn.textContent = trans.contact.send;
    }
  }
} 