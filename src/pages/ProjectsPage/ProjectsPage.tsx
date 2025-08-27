import { PanelMenu } from "primereact/panelmenu";
import type { IProject } from "./project.model";
import { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Link, Outlet } from "react-router-dom";

const _projects: IProject[] = [];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(_projects);
  const items = [
    {
      label: "add project",
      to: "add",
    },
    ...projects.map((pr) => ({ label: pr.title, to: pr.id })),
  ];
  return (
    <main className="flex gap-5">
      <aside className="w-4">
        <Link to={'projects/add'} className="p-5">Add Project</Link>
        <PanelMenu model={items} className="w-full md:w-20rem" />
      </aside>
      <Card className="flex-grow" >
        <Outlet />
       </Card>
    </main>
  );
}
