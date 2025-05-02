import { Component } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Category, TaskItem, TaskStatus } from '../../interface/itask-item';

@Component({
  selector: 'app-taskdetails',
  imports: [RouterLink],
  templateUrl: './taskdetails.component.html',
  styleUrl: './taskdetails.component.css'
})
export class TaskdetailsComponent {
  constructor(public datservice:DataService,private router:Router){

  }
  taskid: any;
  taskdetails!:TaskItem;
  categorydetails!:Category;
  statusdetails!:TaskStatus;
  ngOnInit(): void {
    this.taskid = history.state.taskId;

    this. datservice.getTaskById(this.taskid).subscribe({
      next:(res)=>{
        this.taskdetails=res;


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


  }
  backtoall(){
    this.router.navigate(['tasks'])
  }
}
