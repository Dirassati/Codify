import './allclasses.css'

function AllClasses() {

    const classes = [
        {
            title: "2Tm",
            des: "math",
            date: "dimance 08:00h"
        },
        {
            title: "2Tm",
            des: "math",
            date: "dimance 08:00h"
        },
        {
            title: "2Tm",
            des: "math",
            date: "dimance 08:00h"
        },
        {
            title: "2Tm",
            des: "math",
            date: "dimance 08:00h"
        }
    ]


    return (
        <div className='allclasses'>

            {
                classes.map((item) => (
                    <div className="group-card">
                    <div className="title">{item.title}</div>
                    <div className="description">
                        <div>Description Cours: {item.des}</div>
                        <div>Data : {item.date}</div>
                    </div>
                </div>
                ))           
          
                }

        </div>
    )
}

export default AllClasses