// Enhanced Portfolio JavaScript with All Improvements

document.addEventListener("DOMContentLoaded", () => {
  // Add loading class to body
  document.body.classList.add("loading")

  // Initialize skeleton loader
  initSkeletonLoader()
  initNetworkDetection()

  // Initialize all other animations and interactions
  initScrollAnimations()
  initNavbarScroll()
  initSmoothScrolling()
  initSkillBars()
  initTypingEffect()
  initSlider()
  initThemeToggle()
  initScrollToTop()
  initScrollProgress()
  initActiveNavLink()
  initCounterAnimation()
  initFormHandler()
  initParallaxEffect()
  initAboutSectionFixes()
})

// Enhanced Scroll Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-on-scroll")

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target
        const delay = element.dataset.delay || 0

        setTimeout(() => {
          element.classList.add("animated")
        }, delay)

        observer.unobserve(element)
      }
    })
  }, observerOptions)

  animatedElements.forEach((element) => {
    observer.observe(element)
  })
}

// Enhanced Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })
}

// Enhanced Smooth scrolling
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse)
          bsCollapse.hide()
        }
      }
    })
  })
}

// Enhanced Animated skill bars with smoother animation
function initSkillBars() {
  const skillBars = document.querySelectorAll(".progress-bar")

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target
          const width = progressBar.dataset.width

          // Add staggered animation delay
          setTimeout(() => {
            progressBar.style.width = width + "%"

            // Add shimmer effect after animation
            setTimeout(() => {
              progressBar.classList.add("shimmer-effect")
            }, 1000)
          }, 300)

          skillObserver.unobserve(progressBar)
        }
      })
    },
    { threshold: 0.3 },
  )

  skillBars.forEach((bar) => {
    skillObserver.observe(bar)
  })
}

// Enhanced Typing effect
function initTypingEffect() {
  const typingElement = document.querySelector("#typing-text")
  if (!typingElement) return

  const texts = ["Frontend Developer", "UI/UX Enthusiast", "React Developer", "Creative Coder", "Problem Solver"]
  let textIndex = 0
  let charIndex = 0
  let isDeleting = false

  function typeText() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
    }

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typeSpeed = 500
    }

    setTimeout(typeText, typeSpeed)
  }

  setTimeout(typeText, 1000)
}

// Enhanced 3D Slider with hover pause functionality
function initSlider() {
  const slides = document.querySelectorAll(".slide")
  const indicators = document.querySelectorAll(".indicator")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  const sliderContainer = document.querySelector(".slider-container")

  if (!slides.length) return

  let currentSlide = 0
  let autoPlayInterval
  let isAutoPlaying = true
  const totalSlides = slides.length

  // Set background images
  slides.forEach((slide, index) => {
    const bgUrl = slide.dataset.bg
    if (bgUrl) {
      slide.style.backgroundImage = `url(${bgUrl})`
    }

    // Add hover event listeners for content visibility
    slide.addEventListener("mouseenter", () => {
      pauseAutoPlay()
      slide.querySelector(".slide-content").style.opacity = "1"
      slide.querySelector(".slide-content").style.transform = "translateY(0)"
    })

    slide.addEventListener("mouseleave", () => {
      if (!slide.classList.contains("active")) {
        slide.querySelector(".slide-content").style.opacity = "0"
        slide.querySelector(".slide-content").style.transform = "translateY(20px)"
      }
      resumeAutoPlay()
    })
  })

  function updateSlider() {
    slides.forEach((slide, index) => {
      slide.classList.remove("active", "prev", "next")

      if (index === currentSlide) {
        slide.classList.add("active")
      } else if (index === (currentSlide - 1 + totalSlides) % totalSlides) {
        slide.classList.add("prev")
      } else if (index === (currentSlide + 1) % totalSlides) {
        slide.classList.add("next")
      }
    })

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentSlide)
    })
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides
    updateSlider()
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
    updateSlider()
  }

  function pauseAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval)
      isAutoPlaying = false
    }
  }

  function resumeAutoPlay() {
    if (!isAutoPlaying) {
      startAutoPlay()
    }
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 4000)
    isAutoPlaying = true
  }

  // Event listeners
  nextBtn?.addEventListener("click", () => {
    pauseAutoPlay()
    nextSlide()
    setTimeout(resumeAutoPlay, 2000)
  })

  prevBtn?.addEventListener("click", () => {
    pauseAutoPlay()
    prevSlide()
    setTimeout(resumeAutoPlay, 2000)
  })

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      pauseAutoPlay()
      currentSlide = index
      updateSlider()
      setTimeout(resumeAutoPlay, 2000)
    })
  })

  // Pause on container hover
  sliderContainer?.addEventListener("mouseenter", pauseAutoPlay)
  sliderContainer?.addEventListener("mouseleave", resumeAutoPlay)

  // Initialize slider
  updateSlider()
  startAutoPlay()
}

// Enhanced Theme toggle
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle")
  const body = document.body
  const icon = themeToggle.querySelector("i")

  // Load saved theme
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    body.setAttribute("data-theme", "dark")
    icon.className = "bi bi-sun-fill"
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme")

    if (currentTheme === "dark") {
      body.removeAttribute("data-theme")
      icon.className = "bi bi-moon-fill"
      localStorage.setItem("theme", "light")
    } else {
      body.setAttribute("data-theme", "dark")
      icon.className = "bi bi-sun-fill"
      localStorage.setItem("theme", "dark")
    }
  })
}

// Enhanced Scroll to top with smooth scrolling
function initScrollToTop() {
  const scrollBtn = document.getElementById("scroll-top")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add("show")
    } else {
      scrollBtn.classList.remove("show")
    }
  })

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Enhanced Scroll progress
function initScrollProgress() {
  const progressBar = document.createElement("div")
  progressBar.className = "scroll-progress"
  document.body.appendChild(progressBar)

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.body.scrollHeight - window.innerHeight
    const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100)
    progressBar.style.width = scrollPercent + "%"
  })
}

// Enhanced Active navigation
function initActiveNavLink() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]')

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120
      const sectionHeight = section.clientHeight

      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active")
      }
    })
  })
}

// Enhanced Counter animation
function initCounterAnimation() {
  const counters = document.querySelectorAll(".counter")

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = Number.parseInt(counter.dataset.target)
          let current = 0
          const increment = target / 60
          const duration = 2000

          const updateCounter = () => {
            if (current < target) {
              current += increment
              counter.textContent = Math.ceil(current)
              requestAnimationFrame(updateCounter)
            } else {
              counter.textContent = target
            }
          }

          updateCounter()
          counterObserver.unobserve(counter)
        }
      })
    },
    { threshold: 0.5 },
  )

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })
}

// Enhanced Form handler
function initFormHandler() {
  const form = document.getElementById("contact-form")

  if (!form) return

  form.addEventListener("submit", function (e) {
    e.preventDefault()

    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const subject = document.getElementById("subject").value.trim()
    const message = document.getElementById("message").value.trim()

    // Enhanced validation
    if (!name || !email || !subject || !message) {
      showAlert("Please fill in all fields.", "error")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showAlert("Please enter a valid email address.", "error")
      return
    }

    if (message.length < 10) {
      showAlert("Message should be at least 10 characters long.", "error")
      return
    }

    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...'
    submitBtn.disabled = true

    setTimeout(() => {
      showAlert("Thank you for your message! I'll get back to you soon.", "success")
      this.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 2000)
  })
}

// Enhanced Alert system
function showAlert(message, type) {
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type === "error" ? "danger" : "success"} alert-dismissible fade show position-fixed`
  alertDiv.style.cssText = "top: 100px; right: 20px; z-index: 9999; min-width: 300px;"
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `

  document.body.appendChild(alertDiv)

  setTimeout(() => {
    alertDiv.remove()
  }, 5000)
}

// Parallax effect for hero section
function initParallaxEffect() {
  const heroSection = document.querySelector(".hero-section")
  const techIcons = document.querySelectorAll(".tech-icon")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxSpeed = 0.3

    if (heroSection && scrolled < window.innerHeight) {
      heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`

      // Animate tech icons
      techIcons.forEach((icon, index) => {
        const speed = 0.1 + index * 0.05
        icon.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
      })
    }
  })
}

// Performance optimization
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
  // Heavy scroll operations
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation")
  }
})

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation")
})

// Initialize project card animations
function initProjectCardAnimations() {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
}

// Initialize all project animations
initProjectCardAnimations()

console.log("🚀 Portfolio loaded successfully!")

// Skeleton Loader functionality
function initSkeletonLoader() {
  const skeletonLoader = document.getElementById("skeleton-loader")
  let imagesLoaded = 0
  let totalImages = 0
  let fontsLoaded = false
  let minLoadTime = 2000 // Minimum 2 seconds loading time
  const startTime = Date.now()

  // Count total images
  const images = document.querySelectorAll("img")
  totalImages = images.length

  // If no images, set totalImages to 1 to avoid division by zero
  if (totalImages === 0) {
    totalImages = 1
    imagesLoaded = 1
  }

  // Check if images are loaded
  function checkImageLoad() {
    imagesLoaded++
    if (imagesLoaded >= totalImages && fontsLoaded) {
      checkMinLoadTime()
    }
  }

  // Check minimum load time
  function checkMinLoadTime() {
    const elapsedTime = Date.now() - startTime
    const remainingTime = Math.max(0, minLoadTime - elapsedTime)

    setTimeout(() => {
      hideSkeletonLoader()
    }, remainingTime)
  }

  // Hide skeleton loader
  function hideSkeletonLoader() {
    document.body.classList.remove("loading")
    document.body.classList.add("loaded")

    setTimeout(() => {
      if (skeletonLoader) {
        skeletonLoader.style.display = "none"
      }
    }, 800)
  }

  // Load images
  images.forEach((img) => {
    if (img.complete) {
      checkImageLoad()
    } else {
      img.addEventListener("load", checkImageLoad)
      img.addEventListener("error", checkImageLoad) // Count failed loads too
    }
  })

  // Check if fonts are loaded
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      fontsLoaded = true
      if (imagesLoaded >= totalImages) {
        checkMinLoadTime()
      }
    })
  } else {
    // Fallback for browsers that don't support font loading API
    setTimeout(() => {
      fontsLoaded = true
      if (imagesLoaded >= totalImages) {
        checkMinLoadTime()
      }
    }, 1000)
  }

  // Fallback: Hide loader after maximum time (10 seconds)
  setTimeout(() => {
    if (document.body.classList.contains("loading")) {
      console.warn("Loading took too long, forcing completion")
      hideSkeletonLoader()
    }
  }, 10000)

  // Handle slow network detection
  if (navigator.connection) {
    const connection = navigator.connection
    if (connection.effectiveType === "slow-2g" || connection.effectiveType === "2g") {
      // Extend minimum load time for slow connections
      minLoadTime = 3000
    }
  }
}

// Fix about section overlapping issues
function initAboutSectionFixes() {
  const aboutSection = document.getElementById("about")
  const heroSection = document.getElementById("home")

  if (!aboutSection || !heroSection) return

  function adjustAboutSection() {
    const heroHeight = heroSection.offsetHeight
    const navbarHeight = document.querySelector(".navbar").offsetHeight

    // Ensure about section doesn't overlap with hero
    aboutSection.style.marginTop = "0"
    aboutSection.style.paddingTop = "120px"

    // Add clear fix
    aboutSection.style.clear = "both"
    aboutSection.style.position = "relative"
    aboutSection.style.zIndex = "1"
  }

  // Adjust on load and resize
  adjustAboutSection()
  window.addEventListener("resize", debounce(adjustAboutSection, 250))

  // Fix any floating elements
  const clearFix = document.createElement("div")
  clearFix.style.clear = "both"
  clearFix.style.height = "0"
  clearFix.style.overflow = "hidden"

  if (heroSection.nextElementSibling === aboutSection) {
    heroSection.parentNode.insertBefore(clearFix, aboutSection)
  }
}

// Network status detection
function initNetworkDetection() {
  const skeletonLoader = document.getElementById("skeleton-loader")
  const loadingText = skeletonLoader?.querySelector(".skeleton-loading-text p")

  if (!loadingText) return

  // Check if online
  function updateNetworkStatus() {
    if (!navigator.onLine) {
      loadingText.textContent = "Waiting for internet connection..."
      loadingText.style.color = "#ff6b6b"
    } else {
      loadingText.textContent = "Loading your amazing portfolio..."
      loadingText.style.color = "white"
    }
  }

  // Listen for network changes
  window.addEventListener("online", updateNetworkStatus)
  window.addEventListener("offline", updateNetworkStatus)

  // Initial check
  updateNetworkStatus()
}

// Call network detection
initNetworkDetection()


// pdf download

  function downloadPDF() {
    
    const fileUrl = "Resume.pdf";
    const fileName = "MyFile.pdf";

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  }
