import { EyeOutlined } from "@ant-design/icons"
import { Button, Popover } from "antd"


function VisualSimilaritySearchButton(props) {

    const doSimilaritySearch = () => {

    }

    return (
        <Popover
            title="Visual Similarity Search"
            content="Choose positive and negative images to search for similar images"
            placement="bottomRight"
        >
            <Button
                type="ghost"
                icon={<EyeOutlined />}
                style={{
                    height: 30,
                    color: "white",
                    border: "none",
                }}
                onClick={() => { doSimilaritySearch() }}
            />
        </Popover>
    )
}


export default VisualSimilaritySearchButton