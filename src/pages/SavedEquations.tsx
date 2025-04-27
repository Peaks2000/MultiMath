
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Pencil, TrashIcon, Play } from "lucide-react";

interface SavedEquation {
  id: string;
  name: string;
  equation: string;
  result: string;
}

const SavedEquations = () => {
  const [equations, setEquations] = useState<SavedEquation[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedEquations = JSON.parse(localStorage.getItem('savedEquations') || '[]');
    setEquations(savedEquations);
  }, []);

  const handleRename = (id: string, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const saveNewName = (id: string) => {
    const updatedEquations = equations.map(eq => 
      eq.id === id ? { ...eq, name: editName } : eq
    );
    setEquations(updatedEquations);
    localStorage.setItem('savedEquations', JSON.stringify(updatedEquations));
    setEditingId(null);
  };

  const deleteEquation = (id: string) => {
    const updatedEquations = equations.filter(eq => eq.id !== id);
    setEquations(updatedEquations);
    localStorage.setItem('savedEquations', JSON.stringify(updatedEquations));
  };

  const loadEquation = (equation: SavedEquation) => {
    localStorage.setItem('currentEquation', equation.equation);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-purple-900">Saved Equations</h1>
          <Link to="/">
            <Button variant="outline">
              <Home className="mr-2" />
              Calculator
            </Button>
          </Link>
        </div>
        
        {equations.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No saved equations yet. Use the calculator to create some!
            </CardContent>
          </Card>
        ) : (
          equations.map(equation => (
            <Card key={equation.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {editingId === equation.id ? (
                      <div className="flex gap-2">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={() => saveNewName(equation.id)}>
                          Save
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-medium">{equation.name}</h3>
                        <p className="text-sm text-gray-600">{equation.equation} = {equation.result}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => loadEquation(equation)}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRename(equation.id, equation.name)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteEquation(equation.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedEquations;
