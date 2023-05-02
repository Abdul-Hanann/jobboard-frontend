const events = [
  {
    id: 1,
    title: "Electrician Job",
    start: new Date().setDate(new Date().getDate() + 1),
    end: new Date(),
    className: "bg-success text-white",
    status: 1,
  },
  {
    id: 2,
    title: "Plumbing Job",
    start: new Date(),
    end: new Date(),
    className: "bg-success text-white",
    status: 1,
  },
  {
    id: 3,
    title: "Electrician Job",
    start: new Date().setDate(new Date().getDate() + 18),
    end: new Date().setDate(new Date().getDate() + 19),
    className: "bg-warning text-white",
    status: 3,
  },
  {
    id: 4,
    title: "Carpenter Job",
    start: new Date().setDate(new Date().getDate() - 9),
    end: new Date(),
    className: "bg-info text-white",
    status: 2,
  },
  {
    id: 5,
    title: "Construction Job",
    start: new Date().setDate(new Date().getDate() - 3),
    end: new Date().setDate(new Date().getDate() - 3),
    className: "bg-info text-white",
    status: 2,
  },
  {
    id: 6,
    title: "Construction Job",
    start: new Date().setDate(new Date().getDate()),
    end: new Date(),
    className: "bg-danger text-white",
    status: 4,
  },
  {
    id: 7,
    title: "Electrician Job",
    start: new Date().setDate(new Date().getDate() + 4),
    end: new Date(),
    className: "bg-info text-white",
    status: 2,
  },
  {
    id: 8,
    title: "Plumbing Job",
    start: new Date().setDate(new Date().getDate() - 5),
    end: new Date().setDate(new Date().getDate() - 3),
    className: "bg-warning text-white",
    status: 3,
  },
]

const calenderDefaultCategories = [
  {
    id: 1,
    title: "Completed",
    type: "bg-success",
    checked: false,
  },
  {
    id: 2,
    title: "Approved",
    type: "bg-info",
    checked: false,
  },
  {
    id: 3,
    title: "Pending Approval",
    type: "bg-warning",
    checked: false,
  },
  {
    id: 4,
    title: "Cancelled",
    type: "bg-danger",
    checked: false,
  },
]

export { calenderDefaultCategories, events }
