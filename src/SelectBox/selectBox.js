import React, {Component, PropTypes} from 'react';

export default class SelectBox extends Component {
    static propTypes = {
        value: PropTypes.string,
        options: PropTypes.arrayOf(
            PropTypes.shape({
                icon: PropTypes.string,
                value: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.object
                ]).isRequired,
                label: PropTypes.string.isRequired
            })
        ),
        placeholder: PropTypes.string,
        placeholderIcon: PropTypes.string,
        onSelect: PropTypes.func.isRequired,
        theme: PropTypes.shape({// eslint-disable-line quote-props
            'wrapper': PropTypes.string,
            'dropDown': PropTypes.string,
            'dropDown__btn': PropTypes.string,
            'dropDown__btnIcon': PropTypes.string,
            'dropDown__contents': PropTypes.string,
            'dropDown__item': PropTypes.string,
            'dropDown__itemIcon': PropTypes.string
        }).isRequired,

        //
        // Static component dependencies which are injected from the outside (index.js)
        //
        DropDownComponent: PropTypes.any.isRequired,
        IconComponent: PropTypes.any.isRequired
    };

    state = {
        value: ''
    };

    componentDidMount() {
        const {value} = this.props;

        this.select(value);
    }

    select(incomingValue) {
        const {options, placeholder, placeholderIcon} = this.props;
        const value = incomingValue || placeholder ? '' : options[0].map(o => o.value);

        this.setState({
            value,
            icon: options.filter(o => o.value === value).map(o => o.icon)[0] || placeholderIcon,
            label: options.filter(o => o.value === value).map(o => o.label)[0] || placeholder
        });
    }

    render() {
        const {
            DropDownComponent,
            IconComponent,
            options,
            placeholder,
            placeholderIcon,
            onSelect,
            theme
        } = this.props;
        const {icon, label} = this.state;

        return (
            <div className={theme.wrapper}>
                <DropDownComponent className={theme.dropDown}>
                    <DropDownComponent.Header className={theme.dropDown__btn}>
                        {icon ?
                            <IconComponent className={theme.dropDown__btnIcon} icon={icon}/> :
                                null
                        }
                        {label}
                    </DropDownComponent.Header>
                    <DropDownComponent.Contents className={theme.dropDown__contents}>
                        {placeholder ?
                            placeholder.map((placeholder, index) => (
                                <li key={index} className={theme.dropDown__item}>
                                    {placeholderIcon ?
                                        <IconComponent key={index} className={theme.dropDown__itemIcon} icon={icon}/> :
                                        null
                                    }
                                    {placeholder}
                                </li>
                            )) :
                            null
                        }
                        {options.map(({icon, label, value}, index) => {
                            const onClick = () => {
                                this.select(value);
                                onSelect(value);
                            };

                            return (
                                <li
                                    key={index}
                                    className={theme.dropDown__item}
                                    onClick={onClick}
                                    >
                                    {icon ?
                                        <IconComponent className={theme.dropDown__itemIcon} icon={icon}/> :
                                        null
                                    }
                                </li>
                            );
                        })}
                    </DropDownComponent.Contents>
                </DropDownComponent>
            </div>
        );
    }
}
