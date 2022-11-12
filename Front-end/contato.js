async function creatPerson() {
    try {
       arrayCreate = {
        name: document.getElementById("form-nome").value,
        email: document.getElementById("form-email").value,
        message: document.getElementById("form-mensagem").value,
       }
        
       const response = confirm(`Deseja enviar o cadastro?`)
       if(response){ 
       const sending = await fetch(
        "http://localhost:3000/cadastrados",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(arrayCreate),
        }) 
        const dates = await sending.json();
        alert(`Parabéns ${arrayCreate.name}, você foi cadastrado`)
       }
    } catch (error) {
        console.log(error)
    }
}

document.getElementById("button-form").onclick = creatPerson