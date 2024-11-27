// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initCalendar();
    initLuckyWheel();
    initGrowthPackages();

    // 处理加入按钮点击事件
    const joinButton = document.querySelector('.login-btn');
    if (joinButton) {
        joinButton.addEventListener('click', () => {
            alert('请添加QQ群：123456789 或联系会长进行咨询！');
        });
    }

    // 处理底部导航点击事件
    const navLinks = document.querySelectorAll('.bottom-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // 添加页面滚动动画效果
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.5s ease-out';
        sectionObserver.observe(section);
    });
});

// 轮播图功能
function initCarousel() {
    const slides = [
        {
            image: 'https://game.gtimg.cn/images/dnf/cp/a20231207hd/bg.jpg',
            title: '新手成长礼包',
            description: '完成任务即可领取丰厚奖励！'
        },
        {
            image: 'https://game.gtimg.cn/images/dnf/cp/a20231214hd/kv.jpg',
            title: '每日签到有礼',
            description: '连续签到赢取稀有装备！'
        },
        {
            image: 'https://game.gtimg.cn/images/dnf/cp/a20231221hd/bg.jpg',
            title: '幸运抽奖',
            description: '海量奖励等你来抽！'
        }
    ];

    const container = document.querySelector('.carousel-container');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    // 创建轮播项
    slides.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'carousel-slide' + (index === 0 ? ' active' : '');
        slideDiv.innerHTML = `
            <img src="${slide.image}" alt="${slide.title}">
            <div class="carousel-content">
                <h3>${slide.title}</h3>
                <p>${slide.description}</p>
                <button class="participate-btn">立即参与</button>
            </div>
        `;
        container.appendChild(slideDiv);

        // 创建导航点
        const dot = document.createElement('span');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dotsContainer.appendChild(dot);
    });

    // 自动轮播
    let currentSlide = 0;
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }, 5000);

    function updateCarousel() {
        const slideElements = container.querySelectorAll('.carousel-slide');
        const dots = dotsContainer.querySelectorAll('.dot');
        
        slideElements.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
}

// 签到系统
function initCalendar() {
    const calendar = document.querySelector('.calendar');
    const daysInMonth = 30;
    
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.textContent = i;
        
        // 模拟已签到状态
        if (i < new Date().getDate()) {
            day.classList.add('active');
        }
        
        day.addEventListener('click', () => {
            if (i === new Date().getDate()) {
                day.classList.add('active');
                showReward();
            }
        });
        
        calendar.appendChild(day);
    }
}

// 幸运转盘
function initLuckyWheel() {
    const wheel = document.querySelector('.wheel');
    const spinBtn = document.querySelector('.spin-btn');
    let isSpinning = false;
    
    spinBtn.addEventListener('click', () => {
        if (isSpinning) return;
        
        isSpinning = true;
        const degrees = 1800 + Math.random() * 360; // 至少转5圈
        
        wheel.style.transform = `rotate(${degrees}deg)`;
        
        setTimeout(() => {
            isSpinning = false;
            showPrize();
        }, 3000);
    });
}

// 新手成长礼包
function initGrowthPackages() {
    const packages = [
        { title: '初始礼包', description: '完成新手教程即可领取', progress: 0 },
        { title: '成长礼包', description: '达到30级可领取', progress: 30 },
        { title: '进阶礼包', description: '完成第一章主线任务可领取', progress: 60 }
    ];
    
    const container = document.querySelector('.package-cards');
    
    packages.forEach(pkg => {
        const card = document.createElement('div');
        card.className = 'package-card fade-in';
        card.innerHTML = `
            <div class="progress-bar">
                <div class="progress" style="width: ${pkg.progress}%"></div>
            </div>
            <div class="package-content">
                <h3>${pkg.title}</h3>
                <p>${pkg.description}</p>
                <button class="claim-btn" ${pkg.progress < 100 ? 'disabled' : ''}>
                    ${pkg.progress < 100 ? '未达成' : '领取礼包'}
                </button>
            </div>
        `;
        
        const claimBtn = card.querySelector('.claim-btn');
        claimBtn.addEventListener('click', () => {
            if (pkg.progress >= 100) {
                claimReward(pkg.title);
            }
        });
        
        container.appendChild(card);
    });
}

// 显示奖励弹窗
function showReward(title = '签到奖励', content = '恭喜获得100金币！') {
    alert(`${title}\n${content}`);
}

// 显示抽奖奖品
function showPrize() {
    const prizes = [
        '100金币',
        '稀有武器',
        '角色时装',
        'buff药水',
        '幸运箱子',
        '强化券'
    ];
    
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    showReward('抽奖结果', `恭喜获得 ${prize}！`);
}

// 领取礼包奖励
function claimReward(packageTitle) {
    showReward('礼包领取成功', `已领取 ${packageTitle}！`);
}
