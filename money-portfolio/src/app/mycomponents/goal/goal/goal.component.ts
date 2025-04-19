import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.scss'
})
export class GoalComponent {
  goalProgress = 95;
  goalForm !: FormGroup;
  btnLabel = 'Set New Goals'

  Goal:any[] = [
    {
      id: 'goal1',
      title: 'Buy a Car',
      targetAmount: 500000,
      savedAmount: 120000,
      startDate: '2024-06-01',
      dueDate: '2025-12-31',
      status: 'In Progress',
      category: 'Vehicle'
    },
    {
      id: 'goal2',
      title: 'Vacation to Japan',
      targetAmount: 200000,
      savedAmount: 80000,
      startDate: '2024-09-15',
      dueDate: '2025-08-15',
      status: 'In Progress',
      category: 'Travel'
    },
    {
      id: 'goal3',
      title: 'Emergency Fund',
      targetAmount: 100000,
      savedAmount: 100000,
      startDate: '2023-01-01',
      dueDate: '2025-04-01',
      status: 'Completed',
      category: 'Savings'
    },
    {
      id: 'goal4',
      title: 'Wedding Expenses',
      targetAmount: 300000,
      savedAmount: 50000,
      startDate: '2025-01-01',
      dueDate: '2026-03-01',
      status: 'Not Started',
      category: 'Personal'
    },
    {
      id: 'goal5',
      title: 'Home Down Payment',
      targetAmount: 1000000,
      savedAmount: 250000,
      startDate: '2024-11-01',
      dueDate: '2026-12-31',
      status: 'In Progress',
      category: 'Housing'
    }
  ];
  addGoal(){

  }

  editGoal(goal: any) {
    console.log('Editing goal:', goal);
    // Your logic to open a form or modal for editing
  }
  
  deleteGoal(goal: any) {
    console.log('Deleting goal:', goal);
    this.Goal = this.Goal.filter(g => g.id !== goal.id);
  }
  
}
