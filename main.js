import './style.css'

// ========================================
// DOM Elements
// ========================================
const header = document.querySelector('.header')
const mobileMenuBtn = document.querySelector('.mobile-menu-btn')
const mobileMenu = document.querySelector('.mobile-menu')
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link')
const fadeElements = document.querySelectorAll('.fade-in')

// ========================================
// Mobile Menu Toggle
// ========================================
function toggleMobileMenu() {
  mobileMenuBtn.classList.toggle('active')
  mobileMenu.classList.toggle('active')
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : ''
}

function closeMobileMenu() {
  mobileMenuBtn.classList.remove('active')
  mobileMenu.classList.remove('active')
  document.body.style.overflow = ''
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu)

mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu)
})

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
    closeMobileMenu()
  }
})

// ========================================
// Header Scroll Effect
// ========================================
let lastScroll = 0

function handleScroll() {
  const currentScroll = window.scrollY

  if (currentScroll > 50) {
    header.classList.add('scrolled')
  } else {
    header.classList.remove('scrolled')
  }

  lastScroll = currentScroll
}

window.addEventListener('scroll', handleScroll, { passive: true })

// ========================================
// Intersection Observer for Fade-in Animations
// ========================================
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -100px 0px',
  threshold: 0.1
}

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      fadeObserver.unobserve(entry.target)
    }
  })
}, observerOptions)

fadeElements.forEach(element => {
  fadeObserver.observe(element)
})

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href')

    if (targetId === '#') return

    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      e.preventDefault()

      const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  })
})

// ========================================
// Parallax Effect for Hero Orbs
// ========================================
const orbs = document.querySelectorAll('.gradient-orb')

function handleMouseMove(e) {
  if (window.innerWidth < 768) return

  const mouseX = e.clientX / window.innerWidth
  const mouseY = e.clientY / window.innerHeight

  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 15
    const x = (mouseX - 0.5) * speed
    const y = (mouseY - 0.5) * speed

    orb.style.transform = `translate(${x}px, ${y}px)`
  })
}

document.addEventListener('mousemove', handleMouseMove)

// ========================================
// Button Ripple Effect
// ========================================
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span')
    ripple.classList.add('ripple')

    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`

    this.appendChild(ripple)

    ripple.addEventListener('animationend', () => {
      ripple.remove()
    })
  })
})

// Inject ripple styles dynamically
const rippleStyles = document.createElement('style')
rippleStyles.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`
document.head.appendChild(rippleStyles)

// ========================================
// Initialize
// ========================================
handleScroll()
