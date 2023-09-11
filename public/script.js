 function render(pointsArr) {

    let canvas = document.getElementById('canvas')
    let renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0X000000);

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, 640 /480, 0.1, 5000);
    camera.position.set(0, 200, 1000);

    let light = new THREE.AmbientLight(0Xffffff);
    scene.add(light);

    let material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});

    for (let pointCoord of pointsArr ) {
        let geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pointCoord), 3))

        let mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    }

    renderer.render(scene, camera);
}




document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();

    let Form = document.forms["coneParams"];
    let segmentsCount = Form.elements["segmentsCount"].value;
    let coneHeight = Form.elements["coneHeight"].value;
    let baseRadius = Form.elements["baseRadius"].value;

    // сериализуем данные в json
    let coneParams = JSON.stringify(
        {segmentsCount: segmentsCount, coneHeight: coneHeight, baseRadius: baseRadius}
    );
    let request = new XMLHttpRequest();

    // посылаем запрос на адрес "/user"
    request.open("POST", "/cone", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {

    // получаем и парсим ответ сервера
        let receivedCoords = JSON.parse(request.response);
        if (receivedCoords.err) {
            alert(receivedCoords.err);
        } else {
            render(receivedCoords);
        }
    });
    request.send(coneParams);
});
