const coders = [
    {
        name: "Sahil Khan",
        role: "Full Stack Developer",
        avatar: "sahil.png",
        description: "Experienced in building scalable web applications.",
        skills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
        email: "sahilk12@gmail.com",
        location: "Pune, India",
        github: "github.com/shail"
    },
    {
        name: "Krish jain",
        role: "Frontend Specialist",
        avatar: "krish.png",
        description: "Passionate about creating intuitive user interfaces.",
        skills: ["HTML", "CSS", "JavaScript", "Vue.js", "Sass"],
        email: "",
        location: "Pune India",
        github: "github.com/krish"
    },
    {
        name: "Chiranjeev Agarwal",
        role: "Data Scientist",
        avatar: "chru.png",
        description: "Skilled in machine learning and data analysis.",
        skills: ["Python", "R", "Machine Learning", "SQL", "Tableau"],
        email: "emily.chen@example.com",
        location: "Pune, India",
        github: "github.com/Chiranjeev"
    },
    {
        name: "Aditya",
        role: "DevOps Engineer",
        avatar: "priyansu.png",
        description: "Experienced in cloud infrastructure and CI/CD pipelines.",
        skills: ["Docker", "Kubernetes", "AWS", "Jenkins", "Terraform"],
        email: "ap312038@gmail.com",
        location: "London, UK",
        github: "github.com/aditya"
    }
];

function createCoderCard(coder, index) {
    const card = document.createElement('div');
    card.className = 'coder-card bg-white rounded-lg shadow-md overflow-hidden';
    card.innerHTML = `
        <div class="p-6">
            <img src="${coder.avatar}" alt="${coder.name}'s Avatar" class="w-24 h-24 rounded-full mx-auto mb-4">
            <h2 class="text-xl font-semibold text-center mb-2">${coder.name}</h2>
            <h3 class="text-lg text-gray-600 text-center mb-4">${coder.role}</h3>
            <p class="text-gray-700 mb-4">${coder.description}</p>
            <div class="flex flex-wrap gap-2 mb-4">
                ${coder.skills.map(skill => `<span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">${skill}</span>`).join('')}
            </div>
            <button class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300" onclick="alert('Contact ${coder.name} at ${coder.email}')">
                Contact
            </button>
        </div>
    `;
    setTimeout(() => {
        card.classList.add('show');
    }, index * 100);
    return card;
}

function renderCoders(codersToRender) {
    const grid = document.getElementById('coders-grid');
    grid.innerHTML = '';
    codersToRender.forEach((coder, index) => {
        const card = createCoderCard(coder, index);
        grid.appendChild(card);
    });
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredCoders = coders.filter(coder => 
            coder.name.toLowerCase().includes(searchTerm) ||
            coder.role.toLowerCase().includes(searchTerm) ||
            coder.skills.some(skill => skill.toLowerCase().includes(searchTerm))
        );
        renderCoders(filteredCoders);
    });
}

function setupMouseFollower() {
    const container = document.getElementById('container');
    const mouseFollower = document.getElementById('mouse-follower');

    container.addEventListener('mousemove', (e) => {
        const { left, top } = container.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        mouseFollower.style.left = `${x}px`;
        mouseFollower.style.top = `${y}px`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderCoders(coders);
    setupSearch();
    setupMouseFollower();
});
