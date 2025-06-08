import { Link } from "react-router-dom"
import { memo } from "react"

export default memo(function Projects() {
    const proyects = [
        {
            title: "Proyecto 1",
            description: "Descripción del Proyecto 1"
        },
        {
            title: "Proyecto 2",
            description: "Descripción del Proyecto 2"
        },
        {
            title: "Proyecto 3",
            description: "Descripción del Proyecto 3"
        }
    ]

    return (
        <div className="w-full min-h-dvh lg:px-44 lg:py-20 md:px-24 sm:px-14 py-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary 
                        to-primary/60 bg-clip-text text-transparent pb-8">
                Tus Proyectos
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
                ">
                {
                    proyects.map((proyect, index) => (
                        <Link key={index} 
                            to={`/projects/${index}`}
                            className="px-5 py-4 gap-4 items-center group 
                                  bg-secondary backdrop-blur-sm rounded-xl
                                    border hover:border-primary/50
                                    transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1
                                ">
                            <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                {proyect.title}
                            </h2>
                            <p className="text-sm text-gray-600 ">
                                {proyect.description}
                            </p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
})