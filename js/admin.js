const token = localStorage.getItem("token");

fetch("http://localhost:5000/api/admin", {
  headers: {
    Authorization: "Bearer " + token
  }
})
.then(res => res.json())
.then(data => {
  console.log(data);
})
.catch(err => console.log(err));
