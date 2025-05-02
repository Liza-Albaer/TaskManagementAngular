import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TaskItem } from '../../interface/itask-item';
import { Router, RouterLink} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alltaskitems',
  imports: [RouterLink],
  templateUrl: './alltaskitems.component.html',
  styleUrl: './alltaskitems.component.css'
})
export class AlltaskitemsComponent {
  result!:TaskItem[];
  taskid!:any;
constructor(public datservice:DataService,private router:Router){
}
ngOnInit(): void {
  this. datservice.getAllTasks().subscribe({
    next:(res)=>{
      this.result=res;

    },
    error:(err)=>{
      window.console.error(err);
    }
  })
}
goToDetails(id: any) {

  this.router.navigate(['taskdetails'], { state: {  taskId: id  } });
}
updatetask(id:any){
  this.router.navigate(['updatetask'], { state: {  taskId: id  } });

}
goToaddtask(){
  this.router.navigate(['addtask'])
}
Deletetask(event: any, id: any): void {
  // Prevent form submission or default button action
  event.preventDefault();

  // Show the confirmation dialog first
  Swal.fire({
    title: 'Are you sure?',
    text: 'This action will permanently delete the task.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6'
  }).then((result) => {
    // Only if the user clicks "Yes"
    if (result.isConfirmed) {
      this.datservice.deleteTask(id).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The task has been deleted successfully.',
            confirmButtonColor: '#3085d6'
          });

          window.location.reload();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to delete the task. Please try again later.',
            confirmButtonColor: '#d33'
          });
          console.error(err); // Log error for debugging
        }
      });
    }
  });
}




}
