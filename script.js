// Sample student data generator
function generateStudents(count) {
    const courses = ['Computer Science', 'Engineering', 'Business'];
    const students = [];

    for (let i = 0; i < count; i++) {
        students.push({
            name: `Student ${i + 1}`,
            course: courses[Math.floor(Math.random() * courses.length)],
            year: Math.floor(Math.random() * 4) + 1,
            bio: `A passionate student with a love for ${['technology', 'innovation', 'entrepreneurship'][Math.floor(Math.random() * 3)]}.`,
            image: `/placeholder.svg?height=200&width=200&text=Student${i + 1}`,
            social: {
                twitter: `student${i + 1}`,
                linkedin: `student${i + 1}`,
                github: `student${i + 1}`
            }
        });
    }

    return students;
}

let students = generateStudents(20);
let currentPage = 1;
const studentsPerPage = 8;
let isLoading = false;

// Function to create profile cards
function createProfileCard(student) {
    const card = document.createElement('div');
    card.classList.add('profile-card');

    card.innerHTML = `
        <div class="profile-card-inner">
            <div class="profile-card-front">
                <img src="${student.image}" alt="${student.name}" class="profile-image">
                <div class="profile-info">
                    <h2>${student.name}</h2>
                    <p><strong>Course:</strong> ${student.course}</p>
                    <p><strong>Year:</strong> ${student.year}</p>
                    <div class="social-links">
                        <a href="https://twitter.com/${student.social.twitter}" target="_blank" aria-label="Twitter"><i data-lucide="twitter"></i></a>
                        <a href="https://linkedin.com/in/${student.social.linkedin}" target="_blank" aria-label="LinkedIn"><i data-lucide="linkedin"></i></a>
                        <a href="https://github.com/${student.social.github}" target="_blank" aria-label="GitHub"><i data-lucide="github"></i></a>
                    </div>
                </div>
            </div>
            <div class="profile-card-back">
                <h2>${student.name}</h2>
                <p>${student.bio}</p>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });

    return card;
}

// Function to render profile cards
function renderProfileCards(studentsToRender) {
    const profileGrid = document.getElementById('profileGrid');
    
    studentsToRender.forEach(student => {
        const card = createProfileCard(student);
        profileGrid.appendChild(card);
    });

    lucide.createIcons();
}

// Function to filter and search students
function filterAndSearchStudents() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedCourse = document.getElementById('courseFilter').value;

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm) || 
                              student.bio.toLowerCase().includes(searchTerm);
        const matchesCourse = selectedCourse === '' || student.course === selectedCourse;
        return matchesSearch && matchesCourse;
    });

    document.getElementById('profileGrid').innerHTML = '';
    currentPage = 1;
    renderProfileCards(filteredStudents.slice(0, studentsPerPage));
}

// Infinite scrolling
function loadMoreStudents() {
    if (isLoading) return;

    isLoading = true;
    document.getElementById('loading').style.display = 'flex';

    setTimeout(() => {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const selectedCourse = document.getElementById('courseFilter').value;

        const filteredStudents = students.filter(student => {
            const matchesSearch = student.name.toLowerCase().includes(searchTerm) || 
                                  student.bio.toLowerCase().includes(searchTerm);
            const matchesCourse = selectedCourse === '' || student.course === selectedCourse;
            return matchesSearch && matchesCourse;
        });

        const start = currentPage * studentsPerPage;
        const end = start + studentsPerPage;
        const newStudents = filteredStudents.slice(start, end);

        renderProfileCards(newStudents);
        currentPage++;

        isLoading = false;
        document.getElementById('loading').style.display = 'none';
    }, 1000); // Simulating network delay
}

// Event listeners for search and filter
document.getElementById('searchInput').addEventListener('input', filterAndSearchStudents);
document.getElementById('courseFilter').addEventListener('change', filterAndSearchStudents);

// Infinite scroll event listener
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadMoreStudents();
    }
});

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-theme');
});

// Initial render
renderProfileCards(students.slice(0, studentsPerPage));

// Add new students every 30 seconds
setInterval(() => {
    const newStudents = generateStudents(5);
    students = [...students, ...newStudents];
}, 30000);