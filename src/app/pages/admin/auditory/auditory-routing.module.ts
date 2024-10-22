import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuditoryComponent } from "./auditory.component";

const routes: Routes = [
    { path: '', component: AuditoryComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuditoryRoutingModule { }