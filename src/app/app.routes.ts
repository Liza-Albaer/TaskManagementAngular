import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AlltaskitemsComponent } from './components/alltaskitems/alltaskitems.component';
import { TaskdetailsComponent } from './components/taskdetails/taskdetails.component';
import { AddtaskitemComponent } from './components/addtaskitem/addtaskitem.component';

export const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home', component:HomeComponent,title:'Home'},
  {path:'tasks', component:AlltaskitemsComponent,title:'Tasks'},
  {path:'taskdetails', component:TaskdetailsComponent},
  {path:'addtask', component:AddtaskitemComponent ,title:'AddTask'},
  {path:"**" ,component:NotfoundComponent,title:'NotFound'}
];
