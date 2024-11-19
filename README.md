```markdown
# Steel Grade Comparison Tool

## Overview
The Steel Grade Comparison Tool is a modern web application designed specifically for Nucor's needs, allowing engineers, salespeople, and customers to easily compare different steel grades and their properties. This interactive tool provides real-time visualization of material properties and specifications across different steel grades.

## Features
- 🔍 **Advanced Search**: Quickly find steel grades by grade number or type
- 📊 **Interactive Comparisons**: Side-by-side comparison of multiple steel grades
- 📈 **Property Visualization**: Temperature vs. Strength curves for each grade
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 📋 **Detailed Specifications**: Compare key properties including:
  - Yield Strength
  - Tensile Strength
  - Elongation
  - Carbon Content
  - Common Applications

## Technologies Used
- React.js
- Recharts for data visualization
- Shadcn/ui for UI components
- Lucide React for icons
- GitHub Pages for hosting

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Git

### Setup Instructions
1. Clone the repository
2. Install dependencies with `npm install`
3. Install UI components with `npx shadcn-ui init` and `npx shadcn-ui add card`
4. Start development server with `npm start`

### Deployment
1. Install GitHub Pages dependency: `npm install gh-pages --save-dev`
2. Add deployment scripts to package.json
3. Deploy with `npm run deploy`

## Usage
1. **Search**: Use the search bar to find specific steel grades
2. **Select Grades**: Click on grades to add them to the comparison
3. **View Comparisons**: See detailed property comparisons and temperature curves
4. **Interactive Charts**: Hover over charts to see specific values
5. **Mobile View**: Access all features on mobile devices with responsive layout

## Data Structure
Steel grades are stored in the following format:
```javascript
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
    { temp: 400, strength: 35000 }
  ]
}
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Adding New Steel Grades
To add new steel grades:
1. Follow the data structure format above
2. Ensure all required properties are included
3. Add temperature data points for the strength curve
4. Submit changes through a pull request

## Future Enhancements
- Add more steel grades to the database
- Include additional material properties
- Add data export functionality
- Implement user accounts for saving comparisons
- Add printable comparison reports
- Include material cost estimations

## Troubleshooting
Common issues and solutions:

1. **Installation Problems**
   - Clear npm cache
   - Delete node_modules and reinstall

2. **Deployment Issues**
   - Check homepage setting in package.json
   - Verify GitHub Pages configuration

3. **Visualization Not Rendering**
   - Check browser console for errors
   - Verify data format
   - Ensure container has proper dimensions

```

I've created a simplified README without any links or URLs, focusing on:
1. Core project features and functionality
2. Basic setup instructions
3. Usage guidelines
4. Data structure
5. Future plans and troubleshooting

Would you like me to add or modify any sections?