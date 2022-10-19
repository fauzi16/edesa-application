export const customStyles = {
    control: (base, state) => ({
      ...base,
      height: state.selectProps.isMulti ? null : 35,
      minHeight: 36,
      borderColor: state.isFocused ? 'rgb(153, 232, 232)' : '#ebebeb',
      outline: 0,
      boxShadow: state.isFocused ? '0 0 0 0.2rem rgb(153, 232, 232, .25)' : null,
      backgroundColor: state.isDisabled ? '#e9ecef' : '#ffffff',
      opacity: state.isDisabled ? 1 : 1,
      '&:hover': {
        // Overwrittes the different states of border
        borderColor: null,
      },
    }),
    valueContainer: (base, state) => ({
      ...base,
      marginTop: state.selectProps.isMulti ? -1 : '-5px',
    }),
    singleValue: (base, state) => ({
      ...base,
      color: '#495057',
      fontSize: '12px',
    }),
    placeholder: (base, state) => ({
      ...base,
      color: '#b4b3b3',
      fontSize: '12px',
    }),
    indicatorsContainer: (base, state) => ({
      ...base,
      padding: 0,
    }),
    indicatorContainer: (base, state) => ({
      ...base,
      padding: '2px 8px',
    }),
    clearIndicator: (base, state) => ({
      ...base,
      padding: '2px 8px',
    }),
    menu: (base, state) => ({
      ...base,
      zIndex: '100',
    }),
    option: (styles, {data, isDisabled}) => {
      return {
        ...styles,
        color: isDisabled ? '#ccc' : 'black',
        fontSize: isDisabled ? '12px' : '14px',
        backgroundColor: isDisabled ? null : 'white',
        cursor: isDisabled ? 'not-allowed !important' : 'default',
      };
    },
  };