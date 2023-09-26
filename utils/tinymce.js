export const tinymceConfig = {
    promotion: false,
    skin: "oxide-dark",
    content_css: "dark",
    theme: 'silver',
    plugins: 'lists link image table code help wordcount autoresize accordion advlist anchor autolink autosave charmap',
    toolbar_sticky: true,
    toolbar1: 'undo redo styles bold italic strikethrough forecolor backcolor alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat link image media code charmap restoredraft',
    branding: false,
    min_height: 500,
    /* enable title field in the Image dialog*/
    image_title: true,
    /* enable automatic uploads of images represented by blob or data URIs*/
    automatic_uploads: true,
    file_picker_types: 'image',
    file_picker_callback: function (cb, value, meta) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.onchange = function () {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function () {
                /*
                  Note: Now we need to register the blob in TinyMCEs image blob
                  registry. In the next release this part hopefully won't be
                  necessary, as we are looking to handle it internally.
                */
                var id = 'blobid' + (new Date()).getTime();
                var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                var base64 = reader.result.split(',')[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);
                /* call the callback and populate the Title field with the file name */
                cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
        };
        input.click();
    },
};