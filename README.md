# SHOP.CO e-commerce website

Shop.co is an online based brand which sells cloths that matches your style mixed with hight-end fabric quality
Designed by Baianat: [Baianat.com](https://www.baianat.com/)
live site : [live site](https://shopco-1.netlify.app/)

##Features

````html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        display: flex;
        justify-content: center;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
          sans-serif;
      }
      ul ol {
        background-color: f0f0f0;
        margin: 10px;
        border-radius: 8px;
        padding: 10px;
        font-weight: bold;
        border-left: 3px solid green;
        transition: all 0.2s;
      }
      ul ol:hover {
        background-color: rgb(12, 215, 12);
        color: white;
        transform: scale(1.1);
        transition: all 0.2s;
        cursor: pointer;
      }
      ul ol ul {
        list-style-type: disc;
        font-weight: normal;
      }
      ul {
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <ul>
    Features:
      <ol>
        Responsive Website
      </ol>
      <ol>
        cart system
        <ul>
          <li>increment, decrement and delete items</li>
          <li>cart counter in the header</li>
        </ul>
      </ol>
      <ol>
        Search system
      </ol>
      <ol>
        Writing Reviews
      </ol>
    </ul>
  </body>
</html>
```

##Requirements 

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
          sans-serif;
      }
      ul {
        display: grid;
        position: relative;
        list-style-type: none;
        font-weight: bold;
      }
      ul li {
        display: flex;
        align-items: center;
        gap: 20px;
        background-color: #f0f0f0;
        margin: 10px;
        padding: 10px;
        border-radius: 12px;
        font-size: 18px;
        font-weight: bold;
      }
      input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 15px;
        height: 15px;
        border: 2px solid #555;
        border-radius: 4px;
        display: inline-block;
        position: relative;
      }

      /* Checked state */
      input[type="checkbox"]:checked {
        background-color: #ffffff;
        transform: scale(1.1);
        transition: all .2s;
      }

      /* Create a checkmark */
      input[type="checkbox"]:checked::before {
        content: "✅";
        color: white;
        font-size: 14px;
        position: absolute;
        top: -1.8;
        left: -0.7;
      }
      .task-done {
        position: absolute;
        width: 90%;
        height: 0;
        border: 2px solid rgb(0, 0, 0);
        transition: all ease-in-out;
      }
      @keyframes done {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0.9);
        }
      }
      .done {
        opacity: 0.5;
        animation: done 1s ease-in-out 1s forwards;
        transition: all .2s;
      }
    </style>
  </head>
  <body>
    <body>
      <ul>
        Completed as expected
        <li><input type="checkbox" class="task" />Responsive layout</li>
        <li><input type="checkbox" class="task" />Cart system</li>
        <li><input type="checkbox" class="task" />Cart counter in header</li>
      </ul>
    </body>
    <script>
      const tasks = Array.from(document.querySelectorAll(".task"));

      function checkTask(index) {
        const markup = `<div class='task-done'></div>`
        if (index < tasks.length) {
          setTimeout(() => {
            tasks[index].checked = true;
            tasks[index].parentElement.classList.add('done')
            tasks[index].parentElement.insertAdjacentHTML('afterbegin', markup)
            checkTask(index + 1);
          }, 2000);
        }
      }
      checkTask(0);
    </script>
  </body>
</html>
````
