import React from "react";
import { CKEditor } from "ckeditor4-react";
import PropTypes from "prop-types";

const CKEditorComponent = React.memo(({ field, form }) => {
    const handleEditorChange = (event) => {
        const data = event.editor.getData();
        form.setFieldValue(field.name, data);
    };

    return (
        <div>
            <CKEditor data={field.value} onChange={handleEditorChange} />
        </div>
    );
});

CKEditorComponent.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
};

export default CKEditorComponent;