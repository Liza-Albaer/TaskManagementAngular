import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder , FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { DataService } from '../../services/data.service';
import { Category, TaskItem, TaskStatus } from '../../interface/itask-item';
import { TaskItemDto } from '../../interface/itask-item';
@Component({
  selector: 'app-updatetask',
  imports: [ReactiveFormsModule,
    FormsModule],
  templateUrl: './updatetask.component.html',
  styleUrl: './updatetask.component.css'
})
export class UpdatetaskComponent {
  taskid: any;
   taskdetails!:TaskItem;
    categorydetails!:Category;
    statusdetails!:TaskStatus;
  categories: Category[] = [];
  taskstatuses: TaskStatus[] = [];
  taskitem!:TaskItemDto;
  taskForm: FormGroup;
  constructor(public datservice:DataService,private fb: FormBuilder,private router:Router){
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      createdAt: [{value: new Date(), disabled: true}, Validators.required],
      dueDate: [new Date(), Validators.required],
      statusId: [null],
      categoryId: [null]
    });

  }
  getFormattedDate(dateString: string | Date): string {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  ngOnInit(): void {
    this.taskid = history.state.taskId;

    this. datservice.getTaskById(this.taskid).subscribe({
      next:(res)=>{
        this.taskdetails=res;

  this.taskForm.patchValue({
    title: this.taskdetails.title,
    description: this.taskdetails.description,
    createdAt: this.taskdetails.createdAt,
    dueDate: this.taskdetails.dueDate,
    statusId: this.taskdetails.statusId,
    categoryId: this.taskdetails.categoryId
  });
        if (this.taskdetails.categoryId !== undefined) {
          this.datservice.getCategoryById(this.taskdetails.categoryId).subscribe({
            next: (catRes) => {
              this.categorydetails = catRes;

            },
            error: (err) => console.error(err)
          });
        }

        if (this.taskdetails.statusId !== undefined) {
          this.datservice.getStatusById(this.taskdetails.statusId).subscribe({
            next: (statusRes) => {
              this.statusdetails = statusRes;
              console.log(statusRes);
            },
            error: (err) => console.error(err)
          });
        }
      },
      error:(err)=>{
        window.console.error(err);
      }
    })
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
  updatetask() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.getRawValue();

      const updateData: TaskItemDto = {
        title: formData.title,
        description: formData.description,
        createdAt: this.taskdetails.createdAt, // Use the original creation date
        dueDate: formData.dueDate,
        statusId: formData.statusId,
        categoryId: formData.categoryId
      };
      this.datservice.updateTask(this.taskid,updateData).subscribe({
        next: (response) => {
          // Handle successful response (plain text)
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response, // This will show "updated successfully"
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
