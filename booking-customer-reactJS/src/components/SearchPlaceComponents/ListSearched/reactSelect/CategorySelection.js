import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select, { components } from "react-select";
import PropTypes from "prop-types";
import './cat.css'
import makeAnimated from 'react-select/animated';

const Option = props => (
    <div>
        <components.Option {...props}>
            <label className="container1">
                <input type="checkbox" checked={props.isSelected} onChange={() => null} />{" "}
                <label>{props.label}</label>
            </label>
        </components.Option>
    </div>
);
const AnimatedComponents = makeAnimated();

// const AnimatedComponents = props => (
//     // makeAnimated()
//     <components.MultiValue {...props}>
//         <span>{makeAnimated()}</span>
//     </components.MultiValue>
// );

const MultiValue = props => (
    <components.MultiValue {...props}>
        <span>{props.data.label}</span>
    </components.MultiValue>
);
const customStyles = {
    control: (base, state) => ({
        ...base,
        background: "#FFFFFF",
        padding: "10px",
        // match with the menu
        borderRadius: "8px",
        // Overwrittes the different states of border
        // background: state.isFocused ? "#FFFFFF" : "#FFFFFF",
        border: "2px solid #E3E3E3",
        // Removes weird border around container
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
            // Overwrittes the different states of border
            // borderColor: state.isFocused ? "red" : "blue"
            // boxShadow: "2px 5px 5px rgba(0, 0, 0, 0.25)",
            transition: ".5s"
        }
    }),
    menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 10,
        // kill the gap
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0
    })
};
class CategorySelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            soptions: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.node,
                    label: PropTypes.node
                })
            ).isRequired,
            onChangeCallback: PropTypes.func.isRequired
        }
    }
    static defaultProps = {
        soptions: []
    };

    defaultValue = (catSelect, options) => {
        // console.log(options);
        // console.log(catSelect);
        var wtf = [];
        for (let index = 0; index < options.length; index++) {
            const element = options[index].value;
            wtf.push(options[element])
        }
        return (
            [
                wtf
            ]
        )

    }

    render() {
        const { catSelect, options, onChangeCallback, ...otherProps } = this.props;
        if (options[0] !== undefined) {
            // console.log(options);
            // console.log(options[0].value);
            // console.log(catSelect[0]);
            this.defaultValue(catSelect, options);
            return (
                <Select
                    closeMenuOnSelect={false}
                    isMulti
                    components={{ Option, MultiValue, AnimatedComponents }}
                    options={options}
                    hideSelectedOptions={true}
                    backspaceRemovesValue={false}
                    onChange={e => onChangeCallback(e)}
                    styles={customStyles}
                    closeMenuOnScroll={true}
                    // defaultValue={[
                    //   options[catSelect[0]-1],
                    //   options[catSelect[1]-1],
                    // ]}
                    // defaultValue={
                    //     this.defaultValue(catSelect, options)
                    // }
                    className="containerResek"
                    placeholder="Danh mục"
                    {...otherProps}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: "10px",
                        colors: {
                            ...theme.colors,
                            text: 'orangered',
                            primary25: '#FF7062',
                            primary: '#FF7062',
                        },
                    })}
                />
            );
        } else {
            return null
        }
    }

}


// const mapDispatchToProps = (dispatch, props) => {
//   return {

//   }
// }

// export default connect(null, mapDispatchToProps)(CategorySelection);
const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

    }
}

// export default MyCounter;
export default connect(mapStateToProps, mapDispatchToProps)(CategorySelection);