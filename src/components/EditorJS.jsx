import React, { memo, useEffect, useRef, useState } from "react"
import EditorJS from "@editorjs/editorjs"

import Paragraph from '@editorjs/paragraph'
import Header from "@editorjs/header"
import Alert from "editorjs-alert"
import List from "@editorjs/list"
import Link from '@editorjs/link'
import Embed from "@editorjs/embed"
import Underline from "@editorjs/underline"
import ChangeCase from "editorjs-change-case"
import Strikethrough from "@sotaproject/strikethrough"
import Marker from "@editorjs/marker"
import AlignmentBlockTune from "editorjs-text-alignment-blocktune"
import Code from '@editorjs/code'
import SimpleImage from '@editorjs/simple-image'
import DragDrop from 'editorjs-drag-drop'
import Undo from 'editorjs-undo'

// Editor.js Documentation Source
// https://medium.com/how-to-react/how-to-add-wysiwyg-editor-in-react-js-using-editor-js-cff90e2f3b75

const Editor = React.forwardRef(function Editor({ data, onChangeData, readOnly, placeholder, reamingCharacter, ...props }, ref) {
    const reference = useRef()
    const totalChar = 10000
    const [reamingChar, setReamingChar] = useState(0)
    const EDITOR_JS_TOOLS = {
        textAlignment: {
            class: AlignmentBlockTune,
            config: {
                default: "left",
                blocks: {
                    header: "center"
                }
            }
        },
        paragraph: {
            class: Paragraph,
            inlineToolbar: true,
            // tunes: ["textAlignment"],
        },
        header: {
            class: Header,
            inlineToolbar: true,
            tunes: ["textAlignment"],
            config: {
                placeholder: "Enter a Header",
                levels: [2, 3, 4, 5, 6],
                defaultLevel: 2,
            }
        },
        alert: {
            class: Alert,
            inlineToolbar: true,
            config: {
                defaultType: "primary",
                messagePlaceholder: "Enter something"
            }
        },
        list: {
            class: List,
            inlineToolbar: true,
        },
        linkTool: {
            class: Link,
            inlineToolbar: true,
            config: {
                placeholder: 'Paste a link or insert manually',
                validation: {
                    pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/,
                    message: 'Invalid URL',
                },
            }
        },
        image: {
            class: SimpleImage,
            inlineToolbar: true,
        },
        embed: {
            class: Embed,
            inlineToolbar: true,
            config: {
                services: {
                    youtube: true,
                    codepen: true,
                }
            }
        },
        underline: Underline,
        strikethrough: Strikethrough,
        Marker: {
            inlineToolbar: true,
            class: Marker,
        },
        changeCase: ChangeCase,
        code: Code,
    }
    //Initialize editorjs
    useEffect(() => {
        //Initialize editorjs if we don't have a reference
        if (!reference.current) {
            const editor = new EditorJS({
                holder: 'editorjs',
                readOnly: readOnly,
                tools: EDITOR_JS_TOOLS,
                data: data,
                placeholder: placeholder,
                onReady: () => {
                    new Undo({ editor })
                    new DragDrop(editor)
                },
                async onChange(api, event) {
                    if (!readOnly) {

                        const data = await api.saver.save()
                        onChangeData(data)
                        await api.saver.save().then((outputData) => {
                            if (outputData) {
                                const myJSON = JSON.stringify(outputData.blocks)
                                // console.log(myJSON)
                                setReamingChar((totalChar - myJSON.length))
                            }
                        })
                    }
                },
            })
            reference.current = editor
        }

        //Add a return function to handle cleanup
        return () => {
            if (reference.current && reference.current.destroy) {
                reference.current.destroy()
            }
        }
    }, [])
    return (
        <>
            <div id='editorjs' {...props} />
            {reamingCharacter && <span>Total Reaming Character Spaces : {reamingChar} out of {totalChar}</span>}
        </>
    )
})

export default memo(Editor)
