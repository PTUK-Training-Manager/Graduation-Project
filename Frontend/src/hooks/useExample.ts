interface useExampleProps {
    exampleParam: string
}

const useExample = (props: useExampleProps) => {
    const {exampleParam} = props;
    return {
        exampleParam
    };
};

export default useExample;
