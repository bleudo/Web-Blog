    const newPostBtn = document.querySelectorAll("button")[0];
    const deleteBtns = document.querySelectorAll(".deleteBtn");
    const editBtns = document.querySelectorAll(".editBtn");

    function createNewPost(){
        openNewWindow()
    };
    
    function openNewWindow(){
        window.open("/create_post","Text Editor")
    };
    
    async function editPost(event) {
        const postId = event.target.closest(".col").dataset.id;
        if (postId) {
            // Obtén los detalles del post desde el servidor
            const response = await fetch(`/post/${postId}`);
            const post = await response.json();
    
            if (response.ok) {
                // Abre la ventana de edición con los datos del post
                window.location.href = `/create_post?id=${postId}`;
            } else {
                console.log("Error fetching post");
            }
        } else {
            console.log("Post ID not found");
        }
    }
    
    editBtns.forEach((btn)=>{
        btn.addEventListener("click", editPost)
    });
    
    async function deletePost(event) {
        const postId = event.target.closest(".col").dataset.id;
        if (postId) {
            const response = await fetch(`/post/${postId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                event.target.closest(".col").remove();
            } else {
                console.log("Error deleting post");
            }
        } else {
            console.log("Post ID not found");
        }
    }
    
    deleteBtns.forEach((btn) =>{
        btn.addEventListener('click', deletePost)
    });
    
    async function uploadPost(){
        const formData = new FormData(this);
        const response = await fetch('save-post',{
            method: 'POST',
            body: 'formData'
        })
        if(response.ok){
            console.log("Post saved!")
        } else {
            console.log('Error saving title')
        }
    };
    
        document.getElementById('post-form').addEventListener('submit', function(event){
    
            // Previene el comportamiento por defecto del formulario
            event.preventDefault();
            
            // Obtiene el contenido del editor de texto
            const content = document.getElementById('text-input').innerHTML;

            // Asigna el contenido al campo oculto
            document.getElementById('content').value = content;
            
            // Envia el formulario
            this.submit();
    });

