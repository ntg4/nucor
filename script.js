// Steel grades data
const steelGrades = [
    {
        grade: "A36",
        type: "Carbon Steel",
        yieldStrength: 36000,
        tensileStrength: 58000,
        elongation: 20,
        carbonContent: 0.26,
        applications: ["Construction", "General Purpose"],
        temperatureData: [
            { temp: 0, strength: 40000 },
            { temp: 200, strength: 38000 },
            { temp: 400, strength: 35000 },
            { temp: 600, strength: 30000 },
            { temp: 800, strength: 25000 },
        ]
    },
    {
        grade: "A572-50",
        type: "High-Strength Low-Alloy",
        yieldStrength: 50000,
        tensileStrength: 65000,
        elongation: 21,
        carbonContent: 0.23,
        applications: ["Bridges", "Buildings"],
        temperatureData: [
            { temp: 0, strength: 52000 },
            { temp: 200, strength: 50000 },
            { temp: 400, strength: 47000 },
            { temp: 600, strength: 42000 },
            { temp: 800, strength: 35000 },
        ]
    },
    {
        grade: "A992",
        type: "Structural Steel",
        yieldStrength: 50000,
        tensileStrength: 65000,
        elongation: 21,
        carbonContent: 0.23,
        applications: ["Structural Shapes", "I-Beams"],
        temperatureData: [
            { temp: 0, strength: 52000 },
            { temp: 200, strength: 50000 },
            { temp: 400, strength: 46000 },
            { temp: 600, strength: 41000 },
            { temp: 800, strength: 34000 },
        ]
    }
];

// State management
let selectedGrades = [];
let searchTerm = '';
let strengthChart = null;

// DOM Elements
const searchInput = document.getElementById('searchInput');
const gradesList = document.getElementById('gradesList');
const propertiesDetails = document.getElementById('propertiesDetails');
const chartCanvas = document.getElementById('strengthChart');

// Initialize Chart
function initializeChart() {
    const ctx = chartCanvas.getContext('2d');
    strengthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [0, 200, 400, 600, 800],
            datasets: []
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Strength (psi)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Temperature (°F)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Strength vs Temperature'
                }
            }
        }
    });
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value.toLowerCase();
    renderGradesList();
});

// Render Functions
function renderGradesList() {
    const filteredGrades = steelGrades.filter(grade =>
        grade.grade.toLowerCase().includes(searchTerm) ||
        grade.type.toLowerCase().includes(searchTerm)
    );

    gradesList.innerHTML = filteredGrades.map(grade => `
        <div class="grade-item ${selectedGrades.includes(grade.grade) ? 'selected' : ''}"
             onclick="toggleGrade('${grade.grade}')">
            <div class="grade-info">
                <strong>${grade.grade}</strong>
                <span class="grade-type">${grade.type}</span>
            </div>
            <span class="chevron">
                ${selectedGrades.includes(grade.grade) ? '▼' : '▶'}
            </span>
        </div>
    `).join('');
}

function updateChart() {
    if (!strengthChart) {
        initializeChart();
    }

    const datasets = selectedGrades.map(gradeId => {
        const grade = steelGrades.find(g => g.grade === gradeId);
        return {
            label: grade.grade,
            data: grade.temperatureData.map(d => d.strength),
            borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
            tension: 0.1,
            fill: false
        };
    });

    strengthChart.data.datasets = datasets;
    strengthChart.update();
}

function renderPropertiesDetails() {
    if (selectedGrades.length === 0) {
        propertiesDetails.innerHTML = `
            <div class="empty-state">
                <p>Select steel grades to compare properties</p>
            </div>
        `;
        return;
    }

    propertiesDetails.innerHTML = selectedGrades.map(gradeId => {
        const grade = steelGrades.find(g => g.grade === gradeId);
        return `
            <div class="property-card">
                <h3>${grade.grade}</h3>
                <div class="property-grid">
                    <div class="property-item">
                        <strong>Yield Strength:</strong> ${grade.yieldStrength.toLocaleString()} psi
                    </div>
                    <div class="property-item">
                        <strong>Tensile Strength:</strong> ${grade.tensileStrength.toLocaleString()} psi
                    </div>
                    <div class="property-item">
                        <strong>Elongation:</strong> ${grade.elongation}%
                    </div>
                    <div class="property-item">
                        <strong>Carbon Content:</strong> ${grade.carbonContent}%
                    </div>
                </div>
                <div class="applications">
                    <strong>Applications:</strong> ${grade.applications.join(", ")}
                </div>
            </div>
        `;
    }).join('');
}

function toggleGrade(grade) {
    const index = selectedGrades.indexOf(grade);
    if (index === -1) {
        selectedGrades.push(grade);
    } else {
        selectedGrades.splice(index, 1);
    }
    renderGradesList();
    updateChart();
    renderPropertiesDetails();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
    renderGradesList();
    renderPropertiesDetails();
});

// Handle window resize
window.addEventListener('resize', () => {
    if (strengthChart) {
        strengthChart.resize();
    }
});