import { ChangeEvent, useState } from "react";
import { RadioInput } from "../common/RadioInput.component";

export type FilterRadioType = "All" | "Active" | "Done" | "Overdue";

type FilterSectionProps = {
    onChange: (searchValue: string, filterRadioType: FilterRadioType) => void;
    selectedFilterRadio: FilterRadioType;
};

export const FilterSection = ({
    onChange,
    selectedFilterRadio,
}: FilterSectionProps) => {
    const [searchValue, setSearchValue] = useState("");
    const [radioValue, setRadioValue] = useState("All" as FilterRadioType);

    const isFilterRadioType = (value: string): value is FilterRadioType => {
        return (
            value === "All" ||
            value === "Active" ||
            value === "Done" ||
            value === "Overdue"
        );
    };

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!isFilterRadioType(e.target.value)) {
            return;
        }
        setRadioValue(e.target.value);
        onChange(searchValue, e.target.value);
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        onChange(e.target.value, radioValue);
    };

    return (
        <div className="flex flex-col items-center">
            <input
                type="text"
                placeholder="Type title..."
                className="input w-full max-w-xs input-bordered"
                onChange={(e) => handleSearchChange(e)}
            />
            <div className="flex gap-8 justify-center">
                <RadioInput
                    id="all"
                    label="All"
                    name="filter"
                    value="All"
                    checked={selectedFilterRadio === "All"}
                    onChange={handleRadioChange}
                />
                <RadioInput
                    id="active"
                    label="Active"
                    name="filter"
                    value="Active"
                    checked={selectedFilterRadio === "Active"}
                    onChange={handleRadioChange}
                />
                <RadioInput
                    id="done"
                    label="Done"
                    name="filter"
                    value="Done"
                    checked={selectedFilterRadio === "Done"}
                    onChange={handleRadioChange}
                />
                <RadioInput
                    id="overdue"
                    label="Overdue"
                    name="filter"
                    value="Overdue"
                    checked={selectedFilterRadio === "Overdue"}
                    onChange={handleRadioChange}
                />
            </div>
        </div>
    );
};
