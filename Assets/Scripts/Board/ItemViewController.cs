using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ItemViewController : MonoBehaviour
{
    [SerializeField]
    private SpriteRenderer itemImage;
    [SerializeField]
    private ItemTable itemTable;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    public void SetItemView(string itemName)
    {
        itemImage.sprite = itemTable.GetItemSpriteByName(itemName);
    }
}
