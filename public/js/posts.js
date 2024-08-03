    const newPostBtn = document.querySelectorAll("button")[0];
    const deleteBtns = document.querySelectorAll(".deleteBtn");
    const editBtns = document.querySelectorAll(".editBtn");

    function createNewPost(){
        openNewWindow()
    };
    
    function openNewWindow(){
        window.open("/create_post","Text Editor")
    };
        
    function editPost(event) {
        const postId = event.target.closest(".col").dataset.id;
        if (postId) {
            window.open(`/create_post?id=${postId}`, "Text Editor");
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