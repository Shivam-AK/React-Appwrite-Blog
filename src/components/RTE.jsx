import { useId } from "react"
// import { Editor } from "@tinymce/tinymce-react"
import { Controller } from "react-hook-form"


export default function RTE({ name, control, label, defaultValue = ""}) {

    const id = useId()

    return (
        <div className="w-full">
            {label && <label className="inline-block pl-1 mb-1" htmlFor={id}> {label} </label>}
            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <>
                        <Editor
                            apiKey='9lye21ik1wwc8dn4buuhxx5f7pyobfgmmt56dws8d1shea57'
                            initialValue={defaultValue}
                            onEditorChange={onChange}
                            id={id}
                            init={{
                                initialValue: defaultValue,
                                height: 500,
                                menubar: true,
                                plugins: ["advlist", "autolink", "lists", "link", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "code", "help", "wordcount", "anchor"],

                                toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help | wordcount",

                                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                        />
                        <p>Total Characters Length: 830</p>
                    </>
                )}
            />
        </div>
    )
}
