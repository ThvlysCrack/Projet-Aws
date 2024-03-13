<!DOCTYPE html>
<html>
    <head></head>
    <body>
        <h1>MongoDB with Netlify Functions</h1>
        <ul id="users"></ul>
        <script>
            (async () => {
                let results = await fetch("acceuil/acceuil/FetchUsers").then(response => response.json());
                results.forEach(result => {
                    const listItem = document.createElement("li");
                    listItem.innerText = result.title;
                    document.getElementById("users").appendChild(listItem);
                });
            })();
        </script>
    </body>
</html>
