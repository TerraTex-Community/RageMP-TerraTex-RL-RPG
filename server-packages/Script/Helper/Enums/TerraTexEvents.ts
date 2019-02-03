export const enum TerraTexEvents {
    /**
     * Attributes: x, y, upOrDown, leftOrRight, relativeX, relativeY, worldPosition
     * @param {number} x
     * @param {number} x
     * @param {string} upOrDown
     * @param {string} leftOrRight
     * @param {number} relativeX
     * @param {number} relativeY
     * @param {Vector3} worldPosition
     */
    'PlayerClick' = 'playerClick',
    /**
     * Attributes: x, y, upOrDown, leftOrRight, entityData, entity
     * @param {number} x
     * @param {number} x
     * @param {string} upOrDown
     * @param {string} leftOrRight
     * @param {{}} entityData
     * @param {Vector3} entityData.position
     * @param {number | Entity} entityData.resultEntityData
     * @param {number} entityData.model
     * @param {Entity | null} entity
     */
    'playerClickOnEntity' = 'playerClickOnEntity',
}
