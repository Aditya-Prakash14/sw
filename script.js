// Sample student data
const students = [
    {
        id: 1,
        name: 'Alice Johnson',
        course: 'Computer Science',
        year: 3,
        bio: 'Passionate about AI and machine learning.',
        image: 'https://plus.unsplash.com/premium_photo-1663089895867-428d148a8663?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZ3JhbW1lcnxlbnwwfHwwfHx8MA%3D%3D',
        github: 'https://github.com/alice',
        linkedin: 'https://linkedin.com/in/alice',
        twitter: 'https://twitter.com/alice'
    },
    {
        id: 2,
        name: 'Bob Smith',
        course: 'Electrical Engineering',
        year: 2,
        bio: 'Interested in renewable energy and sustainable tech.',
        image: 'https://media.istockphoto.com/id/2013971698/photo/it-programmer-using-computer.webp?a=1&b=1&s=612x612&w=0&k=20&c=OnkYNJuZIF-O_9-QCBcpUgBX8V71WUQnaHnuuwAxCRE=',
        github: 'https://github.com/bob',
        linkedin: 'https://linkedin.com/in/bob',
        twitter: 'https://twitter.com/bob'
    },
    {
        id: 3,
        name: 'Charlie Brown',
        course: 'Business Administration',
        year: 4,
        bio: 'Aspiring entrepreneur with a focus on tech startups.',
        image: 'https://media.istockphoto.com/id/2012747478/photo/businessman-computer-or-programming-code-in-night-office-for-software-development.webp?a=1&b=1&s=612x612&w=0&k=20&c=jKYgdjR4gdyrwzQ4AcEHKCX6pbgQ3N7mnDf6Gr9AmqM=',
        github: 'https://github.com/charlie',
        linkedin: 'https://linkedin.com/in/charlie',
        twitter: 'https://twitter.com/charlie'
    },
    {
        id: 4,
        name: 'Diana Martinez',
        course: 'Graphic Design',
        year: 1,
        bio: 'Creative thinker with a passion for digital art.',
        image: 'https://media.istockphoto.com/id/1448504442/photo/portrait-of-focused-programer-writing-code-fixing-glasses-and-smiling-sitting-at-desk.jpg?s=612x612&w=0&k=20&c=5XMKSE2EdQ0KOdYDDS_78Y-batO09QRKU1FrXqlHQLs=',
        github: 'https://github.com/diana',
        linkedin: 'https://linkedin.com/in/diana',
        twitter: 'https://twitter.com/diana'
    }
];

// DOM elements
const app = document.getElementById('app');
const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');
const yearFilter = document.getElementById('yearFilter');
const studentGrid = document.getElementById('studentGrid');
const background = document.getElementById('background');
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

// Theme toggle
let theme = 'light';
themeToggle.addEventListener('click', () => {
    theme = theme === 'light' ? 'dark' : 'light';
    app.classList.toggle('dark', theme === 'dark');
    themeToggle.innerHTML = theme === 'light' 
        ? '<i data-lucide="moon" class="w-6 h-6"></i>'
        : '<i data-lucide="sun" class="w-6 h-6"></i>';
    lucide.createIcons();
    updateBackground();
});

// Navbar toggle
navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

// Filter and render students
function filterAndRenderStudents() {
    const searchTerm = searchInput.value.toLowerCase();
    const yearFilterValue = yearFilter.value;

    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(searchTerm) &&
        (yearFilterValue === 'all' || student.year.toString() === yearFilterValue)
    );

    renderStudents(filteredStudents);
}

// Render students
function renderStudents(studentsToRender) {
    studentGrid.innerHTML = studentsToRender.map(student => `
        <div class="card bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 fade-in">
            <div class="card-image">
                <img src="${student.image}" alt="${student.name}" class="w-full h-48 object-cover" />
            </div>
            <div class="card-content p-4">
                <h2 class="text-xl font-semibold mb-2">${student.name}</h2>
                <p class="text-sm text-gray-600 mb-2">${student.course} - Year ${student.year}</p>
                <p class="text-sm mb-4">${student.bio}</p>
                <div class="social-links flex justify-center space-x-4">
                    <a href="${student.github}" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-gray-900">
                        <i data-lucide="github" class="w-5 h-5"></i>
                    </a>
                    <a href="${student.linkedin}" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-gray-900">
                        <i data-lucide="linkedin" class="w-5 h-5"></i>
                    </a>
                    <a href="${student.twitter}" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-gray-900">
                        <i data-lucide="twitter" class="w-5 h-5"></i>
                    </a>
                </div>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
}

// Dynamic background
function updateBackground() {
    const colors = theme === 'light' 
        ? ['#f0f9ff', '#e0f2fe', '#bae6fd']
        : ['#0c4a6e', '#075985', '#0369a1'];
    
    const gradient = `linear-gradient(45deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`;
    background.style.background = gradient;
}

// Event listeners
searchInput.addEventListener('input', filterAndRenderStudents);
yearFilter.addEventListener('change', filterAndRenderStudents);

// Initial render and setup
filterAndRenderStudents();
updateBackground();

// Animate background
let angle = 0;
function animateBackground() {
    angle = (angle + 0.1) % 360;
    const gradient = `linear-gradient(${angle}deg, var(--primary-color) 0%, var(--secondary-color) 100%)`;
    background.style.background = gradient;
    requestAnimationFrame(animateBackground);
}
animateBackground();

// Initialize Lucide icons
lucide.createIcons();
