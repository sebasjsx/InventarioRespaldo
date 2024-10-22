import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WineryComponent } from "./winery.component";


const routes: Routes = [
    { path: '', component: WineryComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class WineryRoutinModule { }