import { create } from "react-test-renderer";
import ProfileStatus from "../Components/Profile/ProfileStatus";
import React from "react";

describe("ProfileStatus Component", () => {
    test("the text should have appeared)", () => {
        const component = create(<ProfileStatus status="This my test text" />);
        const instance = component.root;
        const span = instance.findByType("span");
        expect(span.children[1]).toBe("This my test text")
    });
});
describe("ProfileStatus Component", () => {
    test("will the input appear)", () => {
        const component = create(<ProfileStatus status="This my test text" />);
        const instance = component.root;
        const span = instance.findByType("span");
        span.props.onDoubleClick();
        const input = instance.findByType("input");
        expect(input.props.value).toBe("This my test text")
    });
});
describe("ProfileStatus Component", () => {
    test("will input appear if you don't double-click)", () => {
        const component = create(<ProfileStatus status="This my test text" />);
        const instance = component.root;
        const span = instance.findByType("span");
        //span.props.onDoubleClick();
        expect(() => {
            let input = instance.findByType("input");
        }).toThrow()
    });
});