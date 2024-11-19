import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Search, ChevronDown, ChevronUp, Info } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const SteelGradeComparison = () => {
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample steel grade data - in a real application, this would come from an API
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

  const filteredGrades = steelGrades.filter(grade =>
    grade.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    grade.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleGrade = (grade) => {
    if (selectedGrades.includes(grade)) {
      setSelectedGrades(selectedGrades.filter(g => g !== grade));
    } else {
      setSelectedGrades([...selectedGrades, grade]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Nucor Steel Grade Comparison Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search steel grades..."
              className="pl-8 p-2 w-full border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded p-4">
              <h3 className="text-lg font-semibold mb-4">Available Grades</h3>
              {filteredGrades.map((grade) => (
                <div
                  key={grade.grade}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer rounded"
                  onClick={() => toggleGrade(grade.grade)}
                >
                  <div>
                    <span className="font-medium">{grade.grade}</span>
                    <span className="text-sm text-gray-600 ml-2">({grade.type})</span>
                  </div>
                  {selectedGrades.includes(grade.grade) ? (
                    <ChevronUp className="h-4 w-4 text-blue-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              ))}
            </div>

            <div className="border rounded p-4">
              <h3 className="text-lg font-semibold mb-4">Properties Comparison</h3>
              {selectedGrades.length === 0 ? (
                <div className="flex items-center justify-center h-40 text-gray-500">
                  <div className="text-center">
                    <Info className="h-8 w-8 mx-auto mb-2" />
                    <p>Select steel grades to compare properties</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="temp" 
                        label={{ value: 'Temperature (°F)', position: 'bottom' }} 
                      />
                      <YAxis 
                        label={{ 
                          value: 'Strength (psi)', 
                          angle: -90, 
                          position: 'insideLeft' 
                        }} 
                      />
                      <Tooltip />
                      <Legend />
                      {selectedGrades.map((gradeId) => {
                        const gradeData = steelGrades.find(g => g.grade === gradeId);
                        return (
                          <Line
                            key={gradeId}
                            data={gradeData.temperatureData}
                            name={gradeId}
                            type="monotone"
                            dataKey="strength"
                            stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`}
                            strokeWidth={2}
                          />
                        );
                      })}
                    </LineChart>
                  </ResponsiveContainer>

                  <div className="space-y-2">
                    {selectedGrades.map((gradeId) => {
                      const grade = steelGrades.find(g => g.grade === gradeId);
                      return (
                        <div key={gradeId} className="border-b pb-2">
                          <h4 className="font-medium">{grade.grade}</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>Yield Strength: {grade.yieldStrength.toLocaleString()} psi</div>
                            <div>Tensile Strength: {grade.tensileStrength.toLocaleString()} psi</div>
                            <div>Elongation: {grade.elongation}%</div>
                            <div>Carbon Content: {grade.carbonContent}%</div>
                          </div>
                          <div className="text-sm mt-1">
                            <span className="font-medium">Applications: </span>
                            {grade.applications.join(", ")}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SteelGradeComparison;