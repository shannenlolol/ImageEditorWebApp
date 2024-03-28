let fabricCanvas = new fabric.Canvas('fabricCanvas');
let cropper;
let imageForCropper;

document.getElementById('uploadImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            fabric.Image.fromURL(event.target.result, function(img) {
                fabricCanvas.clear();
                fabricCanvas.add(img).renderAll();
                img.scaleToWidth(fabricCanvas.width);
                fabricCanvas.setActiveObject(img);
            });
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('editDone').addEventListener('click', function() {
    const dataURL = fabricCanvas.toDataURL('image/png');
    
    // Prepare for Cropper.js
    if (imageForCropper) {
        imageForCropper.parentNode.removeChild(imageForCropper);
        imageForCropper = null;
    }
    if (cropper) {
        cropper.destroy();
    }

    imageForCropper = new Image();
    imageForCropper.src = dataURL;
    imageForCropper.id = "imageForCropper";
    document.getElementById('canvasContainer').appendChild(imageForCropper);

    imageForCropper.onload = function() {
        cropper = new Cropper(imageForCropper, {
            aspectRatio: 16 / 9,
            autoCropArea: 0.8,
            restore: false,
            guides: false,
            center: false,
            highlight: false,
            cropBoxMovable: true,
            cropBoxResizable: true,
            dragMode: 'move',
        });
    };
});
