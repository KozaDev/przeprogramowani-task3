function magicTemplate(strings, ...initialValues) {
  let state = initialValues;

  function updateState(newValue) {
    if (Object.keys(newValue).length > initialValues.length) {
      throw new Error(
        "Can't update more properties than exist in initial template"
      );
    }

    state = state.map((item) => {
      const currentPropOfObject = Object.keys(item)[0];
      if (newValue.hasOwnProperty(currentPropOfObject)) {
        return { [currentPropOfObject]: newValue[currentPropOfObject] };
      }
      return item;
    });
  }

  function convertStateToArray(state) {
    return state.map((item) => Object.values(item)[0]);
  }

  function mergeStringsAndTags(strings, tags) {
    return strings.reduce((acc, string, index) => {
      if (index === strings.length - 1) return [...acc, string];
      return [...acc, string, tags[index]];
    }, []);
  }

  return function (values) {
    if (values && Object.keys(values).length) updateState(values);

    const valuesFromState = convertStateToArray(state);

    let results = mergeStringsAndTags(strings, valuesFromState);
    results = results.join("");
    console.log(results);
    return results;
  };
}

const firstName = "James";
const lastName = "Bond";

const update = magicTemplate`My name is ${{ lastName }}. ${{ firstName }} ${{
  lastName,
}}.`;

update({ lastName: "Weasley", firstName: "Ron" });
update({ firstName: "test" });
update();
update({ lastName: "Dime" });
