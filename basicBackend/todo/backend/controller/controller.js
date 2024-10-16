import { Schema } from "../model/model.js"


export const getData = async (req, res) => {
    const todo = await Schema.find()
    res.json(todo)

}

export const makeData = async (req, res) => {
    const { title } = req.body
    await Schema.create({ title: title })
        .then(() => res.status(201).json({ mass: "ho gaya " }))
        .catch(() => res.status(404).json({ mass: "wrong" }))

}
export const upData = async (req, res) => {
    const { id } = req.params
    const { todo } = req.body
    await Schema.findByIdAndUpdate(id, { $set: { title: todo } })
        .then(() => res.status(201).json({ mass: "update" }))
        .catch(() => res.status(404).json({ mass: "something wrong" }))
}
export const delData = async (req, res) => {
    const { id } = req.params
    await Schema.findByIdAndDelete(id)
    .then(() => res.status(201).json({ mass: "delete ho gaya " }))
    .catch(() => res.status(404).json({ mass: "something wrong" }))
}
