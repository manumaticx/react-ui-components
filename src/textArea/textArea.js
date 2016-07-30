import React, {PropTypes} from 'react';
import mergeClassNames from 'classnames';
import TextareaAutoresize from 'react-textarea-autosize';
import executeCallback from './../_lib/executeCallback.js';

const TextArea = props => {
    const {
        placeholder,
        className,
        isValid,
        onChange,
        onFocus,
        onBlur,
        theme,
        ...rest
    } = props;
    const classNames = mergeClassNames({
        [className]: className && className.length,
        [theme.textArea]: true,
        [theme['textArea--invalid']]: !isValid
    });

    return (
        <TextareaAutoresize
            {...rest}
            className={classNames}
            role="textbox"
            placeholder={placeholder}
            onChange={e => onChange(e.target.value)}
            onFocus={() => executeCallback({cb: onFocus})}
            onBlur={() => executeCallback({cb: onBlur})}
            />
    );
};
TextArea.propTypes = {
    // Style related propTypes.
    isValid: PropTypes.bool.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,

    // Interaction related propTypes.
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    theme: PropTypes.shape({
        'textArea': PropTypes.string,
        'textArea--invalid': PropTypes.string
    }).isRequired
};
TextArea.defaultProps = {
    theme: {},
    isValid: true
};

export default TextArea;
