using System.Collections.Generic;
using UnityEngine;

public class PoolManager : MonoBehaviour
{
    public static PoolManager Instance;

    public GameObject objectPrefab;
    public int initialPoolSize = 10;

    private List<GameObject> objectPool = new List<GameObject>();
    [SerializeField]
    GameSettings gameSettings;
    private void Awake()
    {
        if (Instance == null)
            Instance = this;
        else
            Destroy(gameObject);

        InitializePool();
    }

    private void InitializePool()
    {
        initialPoolSize = gameSettings.BoardSizeX * gameSettings.BoardSizeY;
        for (int i = 0; i < initialPoolSize; i++)
        {
            GameObject obj = InstantiateObject();
            objectPool.Add(obj);
        }
    }

    private GameObject InstantiateObject()
    {
        GameObject obj = Instantiate(objectPrefab);
        obj.SetActive(false);
        obj.AddComponent<PoolableObject>();
        return obj;
    }

    public GameObject GetObjectFromPool()
    {
        foreach (GameObject obj in objectPool)
        {
            if (!obj.activeInHierarchy)
            {
                obj.SetActive(true);
                return obj;
            }
        }
        
        GameObject newObj = InstantiateObject();
        objectPool.Add(newObj);
        return newObj;
       
    }
}
