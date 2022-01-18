

// Hide the parameters box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';
let parametersCount = 0;

function getElement(html) {

    let element = document.createElement('div');
    element.innerHTML = html;

    return element.firstElementChild;
}

let jsonRadio = document.getElementById('jsonRadio');

jsonRadio.addEventListener('click', () => {

    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('paramsBox').style.display = 'none';
});

let paramsRadio = document.getElementById('paramsRadio');

paramsRadio.addEventListener('click', () => {

    document.getElementById('parametersBox').style.display = 'block';
    document.getElementById('paramsBox').style.display = 'block';
    document.getElementById('requestJsonBox').style.display = 'none';
});

let addParams = document.getElementById('addParams');

addParams.addEventListener('click', (e) => {

    e.preventDefault();

    let paramsBox = document.getElementById('paramsBox');

    let html = `<div class="row g-3 my-2">
    <label for="parameterKey${parametersCount + 2}" class="col-sm-2 col-form-label">Parameter ${parametersCount + 2}</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterKey${parametersCount + 2}" placeholder="Enter Parameter ${parametersCount + 2} Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterValue${parametersCount + 2}" placeholder="Enter Parameter ${parametersCount + 2} Value">
    </div>
    <div class="col-md-1">
        <button id="addParams${parametersCount + 2}" class="btn btn-primary form-control removeParam">-</button>
    </div>
</div>`;

    parametersCount++;

    paramsBox.appendChild(getElement(html));

    let removeParam = document.getElementsByClassName('removeParam');

    for (let item of removeParam) {

        item.addEventListener('click', (e) => {

            e.target.parentElement.parentElement.remove();
        });
    }

});

let clearAll = document.getElementById('clearAll');

clearAll.addEventListener('click', () => {

    paramsBox = document.getElementById('paramsBox');


    if (confirm('Are you sure you want to do this?')) {

        paramsBox.innerHTML = "";
        document.getElementById('parameterKey1').value = "";
        document.getElementById('parameterValue1').value = "";
        parametersCount = 0;
    }
});

let submit = document.getElementById('submit');

submit.addEventListener('click', () => {

    document.getElementById('responseJsonText').innerHTML = "Please wait... fetching the response!";

    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    let data;

    if (contentType === 'params') {

        data = {};

        for (let i = 0; i < parametersCount + 1; i++) {

            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;

                data[key] = value;
            }
        }

        data = JSON.stringify(data);
    }
    else {

        data = document.getElementById('requestJsonText').value;
    }

    if(requestType==='GET') {

        fetch(url, {
            method: 'GET'
        }).then(responseJson=>responseJson.text()).then((responseData)=>{

            document.getElementById('responseJsonText').innerHTML = responseData;
            Prism.highlightAll();
        });
    }
    else {

        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json'
            }
        }).then(responseText=>responseText.text()).then((responseText)=>{

            document.getElementById('responseJsonText').innerHTML = responseText;
            Prism.highlightAll();
        });
    }
});



