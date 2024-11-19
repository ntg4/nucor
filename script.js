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

// DOM Elements
const searchInput = document.getElementById('searchInput');
const gradesList = document.getElementById('gradesList');
const comparisonChart = document.getElementById('comparisonChart');
const propertiesDetails = document.getElementById('propertiesDetails');

// Initialize Recharts
const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } = Recharts;

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
            <span>
                <strong>${grade.grade}</strong>
                <span class="grade-type">${grade.type}</span>
            </span>
            <span class="chevron">
                ${selectedGrades.includes(grade.grade) ? '▼' : '▶'}
            </span>
        </div>
    `).join('');
}

function renderChart() {
    if (selectedGrades.length === 0) {
        comparisonChart.innerHTML = `
            <div class="empty-state">
                <p>Select steel grades to compare properties</p>
            </div>
        `;
        return;
    }

    const chartData = [];
    const temperatures = [0, 200, 400, 600, 800];

    temperatures.forEach(temp => {
        const dataPoint = { temp };
        selectedGrades.forEach(gradeId => {
            const grade = steelGrades.find(g => g.grade === gradeId);
            const strengthData = grade.temperatureData.find(t => t.temp === temp);
            dataPoint[gradeId] = strengthData.strength;
        });
        chartData.push(dataPoint);
    });

    // Create chart using Recharts
    ReactDOM.render(
        React.createElement(LineChart, {
            width: comparisonChart.offsetWidth,
            height: 400,
            data: chartData,
            margin: { top: 20, right: 30, left: 20, bottom: 5 }
        },
        React.createElement(CartesianGrid, { strokeDasharray: "3 3" }),
        React.createElement(XAxis, { 
            dataKey: "temp",
            label: { value: 'Temperature (°F)', position: 'bottom' }
        }),
        React.createElement(YAxis, {
            label: { 
                value: 'Strength (psi)',
                angle: -90,
                position: 'insideLeft'
            }
        }),
        React.createElement(Tooltip),
        React.createElement(Legend),
        ...selectedGrades.map(gradeId =>
            React.createElement(Line, {
                type: "monotone",
                dataKey: gradeId,
                stroke: `#${Math.floor(Math.random()*16777215).toString(16)}`,
                strokeWidth: 2
            })
        )
        ),
        comparisonChart
    );
}

function renderPropertiesDetails() {
    propertiesDetails.innerHTML = selectedGrades.map(gradeId => {
        const grade = steelGrades.find(g => g.grade === gradeId);
        return `
            <div class="property-card">
                <h3>${grade.grade}</h3>
                <div class="property-grid">
                    <div class="property-item">
                        Yield Strength: ${grade.yieldStrength.toLocaleString()} psi
                    </div>
                    <div class="property-item">
                        Tensile Strength: ${grade.tensileStrength.toLocaleString()} psi
                    </div>
                    <div class="property-item">
                        Elongation: ${grade.elongation}%
                    </div>
                    <div class="property-item">
                        Carbon Content: ${grade.carbonContent}%
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
    renderChart();
    renderPropertiesDetails();
}

// Initial render
renderGradesList();
renderChart();
renderPropertiesDetails();

// Handle window resize
window.addEventListener('resize', () => {
    renderChart();
});