import React, {useState} from 'react';
import {Picker, TextInput, View} from "react-native";
import {commonStyles} from "../../styles/common";

export default function RelativeTimePicker(
  { onChange }:
    { onChange: (relativeDuration: number) => void }
) {
  const timeUnits = {
    minutes: 60 * 1000,
    hours: 60 * 60 * 1000,
    days: 24 * 60 * 60 * 1000,
    weeks: 7 * 24 * 60 * 60 * 1000,
    months: 30 * 24 * 60 * 60 * 1000
  }
  const [number, setNumber] = useState(1);
  const [unit, setUnit] = useState("hours" as keyof typeof timeUnits);

  function getRelativeDuration() {
    const unitValue = timeUnits[unit];
    return unitValue * number;
  }

  const numberChanged = (value: string) => {
    const newNumber = parseInt(value);
    if (!isNaN(newNumber)) setNumber(newNumber);
    onChange(getRelativeDuration());
  }

  const unitChanged = (value: keyof typeof timeUnits) => {
    setUnit(value);
    onChange(getRelativeDuration());
  }

  return (
    <View style={commonStyles.flexRow}>
      <TextInput style={{ ...commonStyles.textInput, flex: 1 }} keyboardType={"numeric"} onChangeText={numberChanged} />
      <Picker style={{ ...commonStyles.textInput, flex: 1 }} selectedValue={unit} onValueChange={unitChanged}>
        {
          Object.keys(timeUnits).map(unit => <Picker.Item label={unit} value={unit} key={unit} />)
        }
      </Picker>
    </View>
  )
}
