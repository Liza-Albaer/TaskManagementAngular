import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder , FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { DataService } from '../../services/data.service';
import { Category, TaskStatus } from '../../interface/itask-item';
import { TaskItemDto } from '../../interface/itask-item';
@Component({
  selector: 'app-addtaskitem',
  imports: [ReactiveFormsModule,
    FormsModule],
  templateUrl: './addtaskitem.component.html',
  styleUrl: './addtaskitem.component.css'
})
export class AddtaskitemComponent {
  categories: Category[] = [];
  taskstatuses: TaskStatus[] = [];

  taskForm: FormGroup;
  constructor(public datservice:DataService,private fb: FormBuilder,private router:Router){
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      createdAt: [new Date(), Validators.required],
      dueDate: [new Date(), Validators.required],
      statusId: [null],
      categoryId: [null]
    });

  }
  getFormattedDate(): string {
    const today = new Date();
    return today.toLocaleDateString('en-CA');
 }
  ngOnInit(): void {

    this. datservice.getAllCategories().subscribe({
      next:(res)=>{

this.categories=res;
       


      },
      error:(err)=>{
        window.console.error(err);
      }
    })
    this. datservice.getAllStatuses().subscribe({
      next:(res)=>{

this.taskstatuses=res;
        console.log(res);


      },
      error:(err)=>{
        window.console.error(err);
      }
    })

  }
  addtask() {
    if (this.taskForm.valid) {
      const newJob: TaskItemDto = this.taskForm.value;

      this.datservice.createTask(newJob).subscribe({
        next: (response) => {
          // Handle successful response (plain text)
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response, // This will show "Added successfully"
            confirmButtonColor: '#3085d6'
          }).then(() => {
            this.taskForm.reset();
            this.router.navigate(['tasks']);
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error || 'Failed to add Task. Please try again later.',
            confirmButtonColor: '#d33'
          });
          console.error(error);
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please fill all required fields before submitting.',
        confirmButtonColor: '#f39c12'
      });
    }
  }
}
